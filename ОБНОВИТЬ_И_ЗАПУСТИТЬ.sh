#!/bin/bash
cd "$(dirname "$0")"
echo "Останавливаю старый сервер на порту 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
sleep 2
echo "Очищаю кэш и собираю проект..."
rm -rf .next
npm run build
echo ""
echo "Запускаю сервер..."
echo "Открой в браузере: http://localhost:3000"
echo "Если видишь синюю полосу вверху — загружена новая версия."
echo ""
npm run start
