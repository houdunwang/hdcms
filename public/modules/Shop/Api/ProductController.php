<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use App\Models\Site;
use Auth;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Database\Eloquent\InvalidCastException;
use Illuminate\Http\Request;
use LogicException;
use Modules\Shop\Entities\Goods;
use Modules\Shop\Entities\Product;
use DB;

/**
 * 货品
 * @package Modules\Shop\Api
 */
class ProductController extends Controller
{
    /**
     * 获取商品的规格属性
     * 属性与商品属性的层级关系
     * @param Site $site
     * @param Goods $goods
     * @return void
     */
    public function attributes(Site $site, Goods $goods)
    {
        return $goods->attributes()->oldest('attribute_id')->get()->map(function ($goodsAttribute) {
            return $goodsAttribute->attribute;
        })->unique()->filter(function ($attr) {
            return $attr->type == 2;
        })->map(function ($attr) use ($goods) {
            $attr['attributes'] = $goods->attributes()->where('attribute_id', $attr['id'])->get();
            return $attr;
        });
    }

    /**
     * 添加货品
     * @param Request $request
     * @param Site $site
     * @param Goods $goods
     * @return void
     * @throws InvalidCastException
     * @throws LogicException
     * @throws BindingResolutionException
     */
    public function store(Request $request, Site $site, Goods $goods)
    {
        DB::beginTransaction();
        //移除无效的货品
        $pids = collect($request->input())->map(fn ($p) => $p['id'] ?? null);
        $goods->products()->whereNotIn('id', $pids)->delete();

        //添加货品
        foreach ($request->input() as $product) {
            $product['attributes'] = implode('-', $product['attributeList']);
            $product['goods_id'] = $goods['id'];
            $product['user_id'] = Auth::id();
            $product['sn'] = $product['sn'] ?? Goods::sn();
            $product['number'] = intval($product['number']);
            $product['site_id'] = $site['id'];
            Product::updateOrCreate(['id' => $product['id'] ?? null], $product);
        }
        DB::commit();
        return $this->message('货品添加成功');
    }

    public function show(Site $site, Goods $goods)
    {
        return $goods->products;
    }

    public function update(Request $request, $id)
    {
    }

    public function destroy($id)
    {
    }
}
