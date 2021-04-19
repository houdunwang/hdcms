<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Modules\Shop\Entities\AttributeType;

/**
 * 属性类型
 * @package Modules\Shop\Http\Controllers
 */
class AttributeTypeController extends Controller
{
    public function index()
    {
        AttributeType::where('site', site('id'));
    }

    public function store(Request $request)
    {
    }

    public function show($id)
    {
    }

    public function update(Request $request, $id)
    {
    }

    public function destroy($id)
    {
    }
}
