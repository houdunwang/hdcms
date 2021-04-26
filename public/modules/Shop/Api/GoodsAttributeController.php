<?php

namespace Modules\Shop\Api;

use App\Models\Site;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Shop\Entities\Goods;
use Modules\Shop\Entities\GoodsAttribute;
use Modules\Shop\Transformers\GoodsAttributeResource;

/**
 * 商品属性
 * @package Modules\Shop\Api
 */
class GoodsAttributeController extends Controller
{
    public function index(Site $site, Goods $good)
    {
        return GoodsAttributeResource::collection($good->attributes);
    }

    public function create()
    {
        return view('shop::create');
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
