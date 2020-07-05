@extends('layouts.admin')

@section('content')
<div>
    <a href="{{ route('site.site.create') }}" class="btn btn-info mb-3">
        <i class="fa fa-plus" aria-hidden="true"></i> 添加网站
    </a>
    @foreach($sites as $site)
    <div class="card mb-3 shadow-sm">
        <div class="card-header d-flex justify-content-between">
            <div>
                套餐:
            </div>
            <div>
                <i class="fa fa-cog" aria-hidden="true"></i> 应用扩展
            </div>
        </div>
        <div class="card-body">
            <i class="fa fa-rss fa-3x mr-3" aria-hidden="true"></i>
            <span class="h3">{{ $site['title'] }}</span>
        </div>
        <div class="card-footer text-muted d-flex flex-column flex-sm-row justify-content-between align-items-center">
            <div class="small">
                <span class="mr-2">创建时间: {{ $site['created_at'] }}</span>
                <span class="mr-2">站长: {{ $site->user->name }}</span>
                <span class="mr-2">所属组: {{ $site->user->group->title }}</span>

                @if($site->module)
                <span class="mr-2">默认模块: {{ $site->module->title }}</span>
                @endif

            </div>
            <div class="small">
                @if($site->module)
                <a href="{{ $site->domain }}" target="_blank" class="text-muted mr-2">
                    <i aria-hidden="true" class="fa fa-home"></i> 访问首页
                </a>
                @endif
                <a href="{{ route('site.config.edit',$site) }}" class="text-muted mr-2">
                    <i aria-hidden="true" class="fa fa-check-circle-o"></i> 网站配置
                </a>
                <a href="" class="text-muted mr-2">
                    <i class="fa fa-comment-o"></i> 微信公众号
                </a>
                <a href="" class="text-muted mr-2">
                    <i class="fa fa-user-o"></i> 用户列表
                </a>
                <a href="" class="text-muted mr-2">
                    <i class="fa fa-user-circle-o"></i> 操作员设置
                </a>
                <a href="{{ route('site.site.edit',$site) }}" class="text-muted mr-2">
                    <i class="fa fa-pencil-square-o"></i> 编辑
                </a>
                <a href="" class="text-muted">
                    <i class="fa fa-trash"></i> 删除
                </a>
            </div>
        </div>
    </div>
    @endforeach

    @unless ($sites->count())
    <div class="card">

        <div class="card-body">
            <strong>
                <i class="fa fa-info-circle" aria-hidden="true"></i> 暂无站点
            </strong>
        </div>

    </div>
    @endunless
</div>
@endsection
