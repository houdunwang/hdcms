<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }}</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    {{-- tabler --}}
    <link href="/tabler/dist/css/tabler.min.css?1611412966" rel="stylesheet" />
    <link href="/tabler/dist/css/tabler-flags.min.css?1611412966" rel="stylesheet" />
    <link href="/tabler/dist/css/tabler-payments.min.css?1611412966" rel="stylesheet" />
    <link href="/tabler/dist/css/tabler-vendors.min.css?1611412966" rel="stylesheet" />
    <link href="/tabler/dist/css/demo.min.css?1611412966" rel="stylesheet" />
    {{-- tabler end --}}
    <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/5.15.2/css/all.min.css">
    <link rel="stylesheet" href="/css/app.css?v={{ config('app.version') }}" />
    <script src="/js/app.js?v={{ config('app.version') }}" defer></script>
</head>

<body>
    @include('hd')
    <div id="app"></div>
    <script src="/tabler/dist/libs/bootstrap/dist/js/bootstrap.bundle.min.js?1611412966"></script>
    <script src="/tabler/dist/js/tabler.min.js?1611412966"></script>
</body>

</html>
