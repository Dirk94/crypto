<?php

namespace Tests;

use Illuminate\Contracts\Console\Kernel;
use Illuminate\Support\Facades\Artisan;

trait CreatesApplication
{
    protected static $wasSetup = false;

    public function createApplication()
    {
        $app = require __DIR__.'/../bootstrap/app.php';

        $app->make(Kernel::class)->bootstrap();

        if (! static::$wasSetup) {
            Artisan::call('migrate:fresh', ['--seed' => 'default']);

            static::$wasSetup = true;
        }

        return $app;
    }
}
