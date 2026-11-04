import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { translations } from './src/i18n/translations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const es = translations.es;
const htmlFiles = ['index.html', 'privacidad.html', 'condiciones.html', 'mensajeria-whatsapp.html', 'ecosistema-aab1.html', 'encuentrame.html'];

// Match opening tag with data-i18n="key" and its corresponding closing tag of the same tag name
const regex = /(<([a-z0-9]+)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/gi;

for (const file of htmlFiles) {
  const htmlPath = path.join(__dirname, file);
  if (!fs.existsSync(htmlPath)) continue;
  let html = fs.readFileSync(htmlPath, 'utf8');

  html = html.replace(regex, (match, openTag, tagName, key, currentContent, closeTag) => {
    if (es[key]) {
      return `${openTag}${es[key]}${closeTag}`;
    }
    return match;
  });

  fs.writeFileSync(htmlPath, html, 'utf8');
}

console.log("HTML files synchronized with Spanish translations successfully.");
