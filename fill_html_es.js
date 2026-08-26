import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import translations
import { translations } from './src/i18n/translations.js';
const es = translations.es;

const htmlPath = path.join(__dirname, 'privacidad.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace all instances of data-i18n="key">... or data-i18n="key">
// using regex
html = html.replace(/data-i18n="([^"]+)"(>)(.*?)(<\/[a-z0-9]+>)?/g, (match, key, gt, content, endTag) => {
    // some elements like title have content inside, others might be empty
    // Actually, a better regex for HTML tags:
    // We want to replace the content inside the tag that has data-i18n="key"
    return match;
});

// Let's use a simpler approach since we know the HTML structure:
// <tag data-i18n="key"></tag>
const regex = /(<[^>]+data-i18n="([^"]+)"[^>]*>)(.*?)(<\/[^>]+>)/g;
html = html.replace(regex, (match, openTag, key, currentContent, closeTag) => {
    if (es[key]) {
        return `${openTag}${es[key]}${closeTag}`;
    }
    return match;
});

fs.writeFileSync(htmlPath, html, 'utf8');
console.log("HTML updated successfully.");
