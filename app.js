/* ======================================================
   AAB1 - INTERACTIVIDAD FRONTEND & LÓGICA PRINCIPAL
   ====================================================== */

import { saveLead } from './src/services/leadService.js';
import { askAAB1Assistant } from './src/services/aiSupport.js';

document.addEventListener('DOMContentLoaded', () => {

  // 1. Selector de Tema Día / Noche (Dark & Light Mode)
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('aab1_theme') || 'dark';

  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('aab1_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggle) {
      const icon = themeToggle.querySelector('.material-icons-round');
      if (icon) {
        icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
      }
    }
  }

  // 2. Control de Menú Navegación Móvil
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-menu .btn');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      mobileToggle.querySelector('.material-icons-round').textContent = isOpen ? 'close' : 'menu';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.querySelector('.material-icons-round').textContent = 'menu';
      });
    });
  }

  // 3. Animaciones de Revelado Progresivo en Scroll
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  animateElements.forEach(el => scrollObserver.observe(el));

  // 4. Manejo del Formulario de Contacto (Leads -> alberdi.andres@gmail.com)
  const contactForm = document.getElementById('aab1-contact-form');
  const formSuccessBox = document.getElementById('form-success-box');
  const resetFormBtn = document.getElementById('reset-contact-form-btn');

  if (contactForm && formSuccessBox) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `Enviando a alberdi.andres@gmail.com... <span class="material-icons-round" style="animation: float 1s infinite;">hourglass_empty</span>`;

      const leadData = {
        name: document.getElementById('name')?.value || '',
        email: document.getElementById('email')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        company: document.getElementById('company')?.value || '',
        service: document.getElementById('service')?.value || '',
        message: document.getElementById('message')?.value || ''
      };

      try {
        await saveLead(leadData);
        contactForm.style.display = 'none';
        formSuccessBox.style.display = 'flex';
      } catch (err) {
        console.error("Error guardando lead:", err);
        contactForm.style.display = 'none';
        formSuccessBox.style.display = 'flex';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  if (resetFormBtn && contactForm && formSuccessBox) {
    resetFormBtn.addEventListener('click', () => {
      formSuccessBox.style.display = 'none';
      contactForm.reset();
      contactForm.style.display = 'block';
    });
  }

  // 5. Agente Conversacional IA (Chatbot Flotante RAG AAB1)
  const aiChatToggle = document.getElementById('ai-chat-toggle');
  const aiChatWindow = document.getElementById('ai-chat-window');
  const aiChatClose = document.getElementById('ai-chat-close');
  const aiChatForm = document.getElementById('ai-chat-form');
  const aiChatInput = document.getElementById('ai-chat-input');
  const aiChatBody = document.getElementById('ai-chat-body');

  const chatHistory = [];

  if (aiChatToggle && aiChatWindow && aiChatClose) {
    aiChatToggle.addEventListener('click', () => {
      aiChatWindow.classList.toggle('active');
      if (aiChatWindow.classList.contains('active')) {
        aiChatInput?.focus();
      }
    });

    aiChatClose.addEventListener('click', () => {
      aiChatWindow.classList.remove('active');
    });
  }

  if (aiChatForm && aiChatInput && aiChatBody) {
    aiChatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const userText = aiChatInput.value.trim();
      if (!userText) return;

      appendChatMessage('user', userText);
      aiChatInput.value = '';

      const loadingEl = appendChatMessage('bot', 'Consultando base de conocimiento AAB1... 🤖');

      try {
        const botResponse = await askAAB1Assistant(userText, chatHistory);
        loadingEl.remove();
        appendChatMessage('bot', botResponse);

        chatHistory.push({ sender: 'user', text: userText });
        chatHistory.push({ sender: 'bot', text: botResponse });
      } catch (err) {
        console.error("Error en Chat IA:", err);
        loadingEl.remove();
        appendChatMessage('bot', 'No pude procesar la consulta en este momento. Puedes escribir directamente a Andrés Alberdi a **alberdi.andres@gmail.com**.');
      }
    });
  }

  function appendChatMessage(sender, text) {
    const msgEl = document.createElement('div');
    msgEl.className = `ai-msg ai-msg-${sender}`;
    const formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    msgEl.innerHTML = formatted;
    aiChatBody.appendChild(msgEl);
    aiChatBody.scrollTop = aiChatBody.scrollHeight;
    return msgEl;
  }

});
