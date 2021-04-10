<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ site('title') }}</title>
    {{-- tabler --}}
    <link href="/tabler/dist/css/tabler.css" rel="stylesheet" />
    <link href="/tabler/dist/css/tabler-flags.min.css" rel="stylesheet" />
    <link href="/tabler/dist/css/tabler-payments.min.css" rel="stylesheet" />
    <link href="/tabler/dist/css/tabler-vendors.min.css" rel="stylesheet" />
    <link href="/tabler/dist/css/demo.min.css" rel="stylesheet" />
    {{-- tabler end --}}
    <link href="https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.2/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/modules/Article/dist/app.css?v={{ config('module_version') }}">
    @stack('styles')
</head>

<body>
    @include('components.topmenu')
    <div id="app" class="mt-10">
        <div class="container-xl">
            @yield('content')
        </div>
    </div>
    {{-- swiper --}}
    <link href="https://cdn.bootcdn.net/ajax/libs/Swiper/6.4.14/swiper-bundle.min.css" rel="stylesheet">
    <script src="https://cdn.bootcdn.net/ajax/libs/Swiper/6.4.14/swiper-bundle.min.js"></script>
    {{-- swiper end --}}
    {{-- tabler --}}
    <script src="/tabler/dist/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/tabler/dist/js/tabler.min.js"></script>
    {{-- tabler end--}}
    @stack('scripts')
    @include('components.footer')
</body>

</html>
