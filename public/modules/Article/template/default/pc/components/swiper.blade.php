@inject('swiper','Modules\Article\Entities\Swiper')
@php
$swiper = $swiper->where('name',$name)->first()
@endphp
@if ($swiper)
<div class="swiper-container">
    <div class="swiper-wrapper">
        @foreach($swiper['items'] as $item)
        <a href="{{ route('article.content',[site(),$item['article_id']]) }}" class="swiper-slide">
            <img src="{{ $item['img'] }}" class="w-cover w-full" />
        </a>
        @endforeach
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
</div>

@push('scripts')
<script>
    setTimeout(function(){
        new Swiper ('.swiper-container', {
            autoplay: {
                delay: {{ $delay??3000 }},
            },
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
  })
})
</script>

@endpush


@push('styles')
<style>
    .swiper-container {
        width: <?php echo $swiper['width'];
        ?>;
        height: <?php echo $swiper['height'];
        ?>;
    }
</style>
@endpush
@endif
