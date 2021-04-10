<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }}</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="keywords" content="{{ site()['setting']['base']['keywords'] ??''}}">
    <meta name="description" content="{{ site()['setting']['base']['description']??'' }}">
    <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/5.15.2/css/all.min.css">
    @yield('head')
</head>

<body>
    @yield('bodyBefore')
    @yield('body')
    @yield('bodyEnd')
</body>

</html>
