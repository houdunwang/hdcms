<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    {{-- tabler --}}
    <link href="/tabler/dist/css/tabler.css" rel="stylesheet" />
    <link href="/tabler/dist/css/tabler-flags.min.css" rel="stylesheet" />
    <link href="/tabler/dist/css/tabler-payments.min.css" rel="stylesheet" />
    <link href="/tabler/dist/css/tabler-vendors.min.css" rel="stylesheet" />
    <link href="/tabler/dist/css/demo.min.css" rel="stylesheet" />

    {{-- tabler end --}}
    <link href="https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.2/css/all.min.css" rel="stylesheet">
    {{-- swiper --}}
    <link href="https://cdn.bootcdn.net/ajax/libs/Swiper/6.4.14/swiper-bundle.min.css" rel="stylesheet">
    <script src="https://cdn.bootcdn.net/ajax/libs/Swiper/6.4.14/swiper-bundle.min.js"></script>
    {{-- swiper end--}}
    <link rel="stylesheet" href="/modules/{{ module('name') }}/dist/app.css?v={{ config('module_version') }}">
    {{-- 模块 --}}
    {{-- <script src="/modules/{{ module('name') }}/dist/app.js?v={{ config('module_version') }}" defer></script> --}}
    <script src="/modules/{{ module('name') }}/dist/manifest.js?v={{ config('module_version') }}"></script>
    <script src="/modules/{{ module('name') }}/dist/vendor.js?v={{ config('module_version') }}"></script>
    <script src="/modules/{{ module('name') }}/dist/app.js?v={{ config('module_version') }}" defer></script>
    @stack('styles')
</head>

<body>
    <script>
        window.hd = @json($hd);
    </script>
    <div id="app">
        <router-view />
    </div>
    {{-- tabler --}}
    <script src="/tabler/dist/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/tabler/dist/js/tabler.min.js"></script>
    {{-- tabler end--}}
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/wangeditor@latest/dist/wangEditor.min.js"></script>
    @stack('scripts')
</body>

</html>