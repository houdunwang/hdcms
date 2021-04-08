@inject('contentModel','Modules\Article\Entities\Content')

<ul class="grid grid-cols-{{ $limit }} gap-5">
    @foreach($contentModel->limit($limit)->whereNotNULL('preview')->get() as $content)
    <li class="flex justify-between py-2">
        <a href="{{ route('article.content',[site(),$content]) }}">
            <img src="{{ $content->preview }}" class="h-20 w-32 object-cover" />
        </a>
    </li>
    @endforeach
</ul>
