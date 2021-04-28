<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use App\Models\Site;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Database\Eloquent\InvalidCastException;
use Illuminate\Http\Request;
use LogicException;
use Modules\Shop\Entities\Goods;
use Modules\Shop\Entities\GoodsAttribute;
use Modules\Shop\Transformers\GoodsAttributeResource;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

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

    /**
     * 商品的规格属性
     * 属性类型与商品属性层级数据结构
     * @param Site $site
     * @param Goods $goods
     * @return void
     */
    public function ruleAttributeList(Site $site, Goods $goods)
    {
        return $goods->attributes()->oldest('attribute_id')->get()->map(function ($goodsAttribute) {
            return $goodsAttribute->attribute;
        })->unique()->filter(function ($attr) {
            return $attr->type == 2;
        })->map(function ($attr) use ($goods) {
            $attr['attributes'] = $goods->attributes()->where('attribute_id', $attr['id'])->latest('id')->get();
            return $attr;
        });
    }

    /**
     * 删除属性
     * @param Site $site
     * @param Goods $good
     * @param GoodsAttribute $attribute
     * @return void
     * @throws InvalidCastException
     * @throws LogicException
     * @throws HttpException
     * @throws NotFoundHttpException
     * @throws BindingResolutionException
     */
    public function destroy(Site $site, Goods $good, GoodsAttribute $attribute)
    {
        //如果商品属性被货品使用时不允许删除
        $attributeIds = $good->products->pluck('attributes')->reduce(function ($attrs, $item) {
            return array_merge($attrs, explode('-', $item));
        }, []);

        if (in_array($attribute['id'], $attributeIds)) {
            abort(403, '属性已有货品在使用');
        }
        $attribute->delete();
        return $this->message('商品属性删除成功');
    }
}
