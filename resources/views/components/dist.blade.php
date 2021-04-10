<link rel="stylesheet" href="/modules/{{ module('name') }}/css/app.css">
<script src="/modules/{{ module('name') }}/dist/app.js?v={{ config('module_version') }}" defer></script>
<script>
    window.hd = @json($hd);
</script>
