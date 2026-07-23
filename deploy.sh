#!/bin/bash
set -e

PROJECT_ID="aab1-landing"
echo "=== MODO DE DESPLIEGUE: PRODUCCIÓN (AAB1-landing) ==="

echo "=== [1/4] Ejecutando pruebas unitarias locales ==="
npm run test

echo "=== [2/4] Ejecutando análisis de vulnerabilidades con Snyk ==="
if npx snyk test; then
  echo "✔ Análisis de Snyk completado sin vulnerabilidades críticas."
else
  echo "⚠ Advertencia: Snyk detectó vulnerabilidades o snyk no configurado."
fi

echo "=== [3/4] Compilando y publicando en Firebase ($PROJECT_ID) ==="
npm run build
npx -y firebase-tools@latest deploy --project "$PROJECT_ID" --only hosting

echo "=== [4/4] Confirmando y subiendo cambios a GitHub ==="
git add .
if git diff-index --quiet HEAD -- 2>/dev/null; then
  echo "No hay cambios pendientes por commitear."
else
  git commit -m "chore: despliegue (en producción) ($PROJECT_ID) y actualizaciones" || true
fi

echo "Intentando realizar push a GitHub..."
if git push origin main 2>/dev/null || git push origin master 2>/dev/null; then
  echo "✔ Cambios publicados con éxito en GitHub."
else
  echo "⚠ No se pudo hacer push a GitHub (verifique remoto configurado)."
fi

echo "=== ¡Despliegue finalizado con éxito en $PROJECT_ID! ==="
