@extends('system.layouts.master')

@section('content')
@include('site.menu._nav')
<site-menu :id="{{ $site['id'] }}" :id="{{ $site['id'] }}" />
@endsection
