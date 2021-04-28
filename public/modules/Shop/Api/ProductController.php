<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use App\Models\Site;
use Auth;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Modules\Shop\Entities\Goods;
use DB;
use Modules\Shop\Entities\Product;
use Modules\Shop\Transformers\ProductResource;

/**
 * 货品
 * @package Modules\Shop\Api
 */
class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum']);
    }

    /**
     * 获取商品的规格属性
     * @param Site $site
     * @param Goods $goods
     * @return void
     */
    public function attributes(Site $site, Goods $goods)
    {
        return $goods->attributes()->latest('id')->get()->map(function ($goodsAttribute) {
            return $goodsAttribute->attribute;
        })->unique()->filter(function ($attr) {
            return $attr->type == 2;
        })->map(function ($attr) use ($goods) {
            $attr['attributes'] = $goods->attributes()->where('attribute_id', $attr['id'])->latest('id')->get();
            return $attr;
        });
    }

    public function index(Site $site, Goods $good)
    {
        return ProductResource::collection($good->products);
    }

    public function store(Request $request, Site $site, Goods $good)
    {
        DB::beginTransaction();
        //删除无效的库存
        $ids = array_map(fn ($p) => $p['id'] ?? 0, $request->input());
        $good->products()->whereNotIn('id', $ids)->delete();
        //更新库存
        foreach ($request->input() as $product) {
            if (!empty($product['attributeList'])) {
                $product['number'] = (int)$product['number'];
                $product['sn'] = $product['sn'] ?? Goods::sn();
                $product['goods_id'] = $good['id'];
                $product['attributes'] = collect($product['attributeList'])->join('-');
                $product['site_id'] = $site['id'];
                $product['user_id'] = Auth::id();
                Product::updateOrCreate(['id' => $product['id'] ?? null], $product);
            }
        }

        DB::commit();
        return $this->message('库存更新成功');
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function show($id)
    {
        return view('shop::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit($id)
    {
        return view('shop::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable
     */
    public function destroy($id)
    {
        //
    }
}
