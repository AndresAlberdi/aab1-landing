import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const TARGET_LEAD_EMAIL = 'andres.alberdi@aab1.website';

export async function saveLead(leadData) {
  const payload = {
    nombre: leadData.name || '',
    empresa: leadData.company || '',
    email: leadData.email || '',
    telefono: leadData.phone || '',
    servicio: leadData.service || '',
    mensaje: leadData.message || '',
    notificarA: TARGET_LEAD_EMAIL,
    estado: 'NUEVO_LEAD_AAB1',
    fechaCreacion: new Date().toISOString(),
    createdAt: Date.now()
  };

  // 1. Guardar copia local de respaldo inmediatamente
  try {
    const existing = JSON.parse(localStorage.getItem('aab1_leads_local') || '[]');
    existing.push(payload);
    localStorage.setItem('aab1_leads_local', JSON.stringify(existing));
  } catch (e) {
    // Ignorar si localStorage está deshabilitado
  }

  // 2. Enviar notificación directa por correo a alberdi.andres@gmail.com vía FormSubmit AJAX
  sendEmailNotification(payload).catch(err => console.warn("Notificación de correo diferida:", err));

  // 3. Guardar registro en Cloud Firestore (Spark Always Free Tier) con timeout
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Firestore timeout')), 3500);
  });

  try {
    const docRef = await Promise.race([
      addDoc(collection(db, 'leads'), payload),
      timeoutPromise
    ]);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn("Respaldo local utilizado para lead:", error.message || error);
    return { success: true, id: 'local-' + Date.now(), isFallback: true };
  }
}

async function sendEmailNotification(lead) {
  try {
    await fetch('https://formsubmit.co/ajax/' + TARGET_LEAD_EMAIL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `🚀 ¡Nuevo Lead Requerimiento AAB1! (${lead.nombre})`,
        _template: 'table',
        _captcha: 'false',
        Nombre: lead.nombre,
        Empresa: lead.empresa,
        Email_Cliente: lead.email,
        Telefono: lead.telefono,
        Servicio_Interes: lead.servicio,
        Mensaje: lead.mensaje,
        Fecha: lead.fechaCreacion
      })
    });
  } catch (e) {
    console.warn("Error enviando correo por FormSubmit:", e);
  }
}
