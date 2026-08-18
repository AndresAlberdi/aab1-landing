const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Replacements
html = html.replace('Javier Andrés Alberdi Baptista (Lic.', 'Javier Andres Alberdi Baptista (Lic.');
html = html.replace('AAB1, Andrés Alberdi, Andrés Alberdi Baptista', 'AAB1, Javier Andres Alberdi Baptista');
html = html.replace('content="Javier Andrés Alberdi Baptista"', 'content="Javier Andres Alberdi Baptista"');
html = html.replace('Javier Andrés Alberdi Baptista. Servicios', 'Javier Andres Alberdi Baptista. Servicios');
html = html.replace('dirigida por Andrés Alberdi Baptista.', 'dirigida por Javier Andres Alberdi Baptista.');
html = html.replace('"name": "Javier Andrés Alberdi Baptista",', '"name": "Javier Andres Alberdi Baptista",');
html = html.replace('team_andres_title">Andrés Alberdi</h5>', 'team_andres_title">Javier Andres Alberdi Baptista</h5>');
html = html.replace('SOBRE ANDRÉS ALBERDI BAPTISTA', 'SOBRE JAVIER ANDRES ALBERDI BAPTISTA');
html = html.replace('founder_title_gradient">Andrés Alberdi</span>', 'founder_title_gradient">Javier Andres Alberdi Baptista</span>');
html = html.replace('<strong>Javier Andrés Alberdi Baptista</strong>', '<strong>Javier Andres Alberdi Baptista</strong>');
html = html.replace('divulgación de Andrés Alberdi:', 'divulgación de Javier Andres Alberdi Baptista:');
html = html.replace('<p style="color: var(--accent-light); font-weight: 600;">alberdi.andres@gmail.com</p>', '<p style="color: var(--accent-light); font-weight: 600;">alberdi.andres@gmail.com<br>aalberdi@gmail.com</p>');
html = html.replace('<strong>alberdi.andres@gmail.com</strong>.', '<strong>alberdi.andres@gmail.com</strong> o <strong>aalberdi@gmail.com</strong>.');
html = html.replace('Gemini • Andrés Alberdi</p>', 'Gemini • Javier Andres Alberdi Baptista</p>');

// Footer replacement
const oldFooter = `  <!-- Footer -->
  <footer>
    <div class="container"
      style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <img src="assets/aab1-logo.png" alt="AAB1 Logo" style="height: 32px;">
        <span style="font-weight: 800; color: var(--text-title);">AAB1</span>
        <span style="font-size: 0.85rem; color: var(--text-muted);" data-i18n="footer_desc">— Consultoría Tecnológica
          Avanzada</span>
      </div>
      <p style="font-size: 0.85rem; color: var(--text-muted);" data-i18n="footer_rights">
        &copy; 2026 AAB1 (Javier Andrés Alberdi Baptista). Todos los derechos reservados.
      </p>
    </div>
  </footer>`;

const newFooter = `  <!-- Footer -->
  <footer>
    <div class="container"
      style="display: flex; flex-direction: column; gap: 1rem; text-align: center;">
      <div style="display: flex; justify-content: center; align-items: center; gap: 0.75rem;">
        <img src="assets/aab1-logo.png" alt="AAB1 Logo" style="height: 32px;">
        <span style="font-weight: 800; color: var(--text-title);">AAB1</span>
        <span style="font-size: 0.85rem; color: var(--text-muted);" data-i18n="footer_desc">— Consultoría Tecnológica
          Avanzada</span>
      </div>
      
      <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.25rem;">
        <p style="margin: 0;">NIT: 2441214012 | Tipo de empresa: PERSONA JURÍDICA - EMPRESA UNIPERSONAL</p>
        <p style="margin: 0;">Actividades: Actividades de consultoría de informática y de gestión de instalaciones</p>
        <p style="margin: 0;">Dirección: ZONA: IRPAVI II, AVENIDA: LOS EUCALIPTOS, TIPO DE ESTABLECIMIENTO: CONDOMINIO ECO SPA, NRO.: S/N, PISO: 3, BLOQUE: 8, NRO DPTO/LOCAL/OF/PUESTO: A, TELEFONO: 72047339</p>
      </div>

      <p style="font-size: 0.85rem; color: var(--text-muted);" data-i18n="footer_rights">
        &copy; 2026 AAB1 (Javier Andres Alberdi Baptista). Todos los derechos reservados.
      </p>
    </div>
  </footer>`;

html = html.replace(oldFooter, newFooter);

// Handle any additional name replacements for Javier Andrés Alberdi Baptista globally
html = html.replace(/Javier Andrés Alberdi Baptista/g, 'Javier Andres Alberdi Baptista');

fs.writeFileSync(indexPath, html, 'utf8');

const appPath = path.join(__dirname, 'app.js');
let appJs = fs.readFileSync(appPath, 'utf8');
appJs = appJs.replace(/alberdi\.andres@gmail\.com/g, 'alberdi.andres@gmail.com o aalberdi@gmail.com');
appJs = appJs.replace(/Andrés Alberdi/g, 'Javier Andres Alberdi Baptista');
fs.writeFileSync(appPath, appJs, 'utf8');

const stylesPath = path.join(__dirname, 'styles.css');
let stylesCss = fs.readFileSync(stylesPath, 'utf8');
stylesCss = stylesCss.replace(/ANDRES ALBERDI/g, 'JAVIER ANDRES ALBERDI BAPTISTA');
fs.writeFileSync(stylesPath, stylesCss, 'utf8');

const testPath = path.join(__dirname, 'src/__tests__/aab1.test.js');
let testJs = fs.readFileSync(testPath, 'utf8');
testJs = testJs.replace(/Andrés Alberdi/g, 'Javier Andres Alberdi Baptista');
fs.writeFileSync(testPath, testJs, 'utf8');

const aiSupportPath = path.join(__dirname, 'src/services/aiSupport.js');
let aiSupportJs = fs.readFileSync(aiSupportPath, 'utf8');
aiSupportJs = aiSupportJs.replace(/Javier Andrés Alberdi Baptista/g, 'Javier Andres Alberdi Baptista');
aiSupportJs = aiSupportJs.replace(/Andrés Alberdi/g, 'Javier Andres Alberdi Baptista');
aiSupportJs = aiSupportJs.replace(/andresalberdi@gmail\.com \/ aalberdi@gmail\.com/g, 'aalberdi@gmail.com / alberdi.andres@gmail.com');
fs.writeFileSync(aiSupportPath, aiSupportJs, 'utf8');

console.log('Replacements completed.');
