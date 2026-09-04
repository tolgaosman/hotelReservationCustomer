<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*'],

    'allowed_methods' => ['*'],

    // Next.js müşteri sitesi buradan istek atar. LAN üzerinden (ör. telefon/başka
    // makineden) test edilebilmesi için ek origin'ler FRONTEND_ADDITIONAL_URLS'de
    // virgülle ayrılmış şekilde tanımlanabilir.
    'allowed_origins' => array_filter(array_merge(
        [env('FRONTEND_URL', 'http://localhost:3000')],
        array_map('trim', explode(',', env('FRONTEND_ADDITIONAL_URLS', ''))),
    )),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
