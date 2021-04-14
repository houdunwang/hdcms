<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];
    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    // public function render($request, Throwable $exception)
    // {
    //     $response = parent::render($request, $exception);
    //     $code = $response->status();
    //     if ($request->expectsJson() && key_exists($code, $this->messages)) {
    //         $message = $this->messages[$code];
    //         if ($code == 422) {
    //             return response(['message' => $message, 'errors' => $exception->errors()], $code);
    //         } else {
    //             return response(['message' => $message], $code);
    //         }
    //     }
    //     return $response;
    // }
}
