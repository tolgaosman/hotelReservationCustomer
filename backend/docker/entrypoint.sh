#!/bin/sh
set -e

echo "Veritabanı bekleniyor ($DB_HOST:$DB_PORT)..."
until mysqladmin ping -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USERNAME" -p"$DB_PASSWORD" --silent; do
    sleep 2
done
echo "Veritabanı hazır."

php artisan config:clear
php artisan migrate --force

if [ "$DB_SEED_ON_BOOT" = "true" ]; then
    php artisan db:seed --force
fi

php artisan config:cache
php artisan route:cache

exec supervisord -c /etc/supervisor/conf.d/supervisord.conf
