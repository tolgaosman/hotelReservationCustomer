#!/bin/sh
set -e

echo "Veritabani bekleniyor ($DB_HOST:$DB_PORT)..."
until php -r 'try { new PDO("mysql:host=".getenv("DB_HOST").";port=".getenv("DB_PORT"), getenv("DB_USERNAME"), getenv("DB_PASSWORD")); } catch (Throwable $e) { fwrite(STDERR, $e->getMessage().PHP_EOL); exit(1); }'; do
    sleep 2
done
echo "Veritabani hazir."

php artisan config:clear
php artisan migrate --force

if [ "$DB_SEED_ON_BOOT" = "true" ]; then
    php artisan db:seed --force
fi

php artisan config:cache
php artisan route:cache

exec supervisord -c /etc/supervisor/conf.d/supervisord.conf
