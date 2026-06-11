<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use function in_array;

class ValidateJwtAudience
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle($request, Closure $next)
    {
        $payload = auth()->payload();

        $audiences = (array) $payload->get('aud');

        if (! in_array(config('JWT_AUDIENCE', 'resource-api'), $audiences, true)) {
            return response()->json([
                'success' => false,
                'message' => 'Token inválido.',
            ], 401);
        }

        return $next($request);
    }
}
