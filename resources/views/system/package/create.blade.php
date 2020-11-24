@extends('system.layouts.master')

@section('content')
@include('system.package._nav')

<form action="{{ route("system.package.store") }}" method="post">
  @csrf
  <div class="card mt-3 shadow-sm">
    <div class="card-header">
      套餐设置
    </div>
    <div class="card-body">
      <x-form title="套餐名称" name="title" required class="col-12 col-md-8"></x-form>
    </div>
  </div>

  <div class="card mt-3 shadow-sm bg-light">
    <div class="card-header">
      模块选择
    </div>
    <div class="card-body">
      <system-module-select></system-module-select>
    </div>
  </div>
  <div class="card mt-3 shadow-sm bg-light">
    <div class="card-header">
      模板风格选择
    </div>
    <div class="card-body">
      <system-template-select></system-template-select>
    </div>
  </div>
  <button class="btn btn-primary mt-3">保存</button>
</form>
@endsection
