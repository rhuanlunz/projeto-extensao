<?php

namespace App\Providers;

use App\Models\User;
use Dedoc\Scramble\Scramble;
use Dedoc\Scramble\Support\Generator\OpenApi;
use Dedoc\Scramble\Support\Generator\SecurityScheme;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Scramble::configure()
            ->withDocumentTransformers(function (OpenApi $openApi) {
                $openApi->secure(
                    SecurityScheme::http('bearer', 'JWT')
                );
            });

        RateLimiter::for('api', fn (Request $request): Limit =>
            Limit::perMinute(100)->by($request->ip()));

        RateLimiter::for('register', fn (Request $request): Limit =>
            Limit::perMinute(10)->by($request->ip()));
        
        RateLimiter::for('login', fn (Request $request): Limit =>
            Limit::perMinute(5)->by($request->ip()));

        ResetPassword::createUrlUsing(fn (User $user, string $token): string =>
            "http://localhost:5173/autenticacao/redefinir-senha?token=$token");
    }
}
