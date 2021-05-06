<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use App\Models\Site;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
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

    public function destroy(Site $site, Goods $good, GoodsAttribute $attribute)
    {
        //如果有货品使用该属性时不允许删除
        $isUse = $good->products->some(function ($product) use ($attribute) {
            return in_array($attribute['id'], $product['attributeList']->toArray());
        });

        if ($isUse) {
            abort(403, '属性已被货品使用');
        }
        // $attribute->delete();
        return $this->message('属性删除成功');
    }
}
