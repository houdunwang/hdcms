<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use App\Models\Site;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Modules\Shop\Entities\Goods;
use Modules\Shop\Http\Requests\GoodsRequest;
use Modules\Shop\Transformers\GoodsResource;
use DB;
use Modules\Shop\Entities\GoodsAttribute;
use Auth;
use Illuminate\Database\Eloquent\InvalidCastException;
use LogicException;
use InvalidArgumentException;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

/**
 * 商品
 * @package Modules\Shop\Api
 */
class GoodsController extends Controller
{

    /**
     * 推荐商品
     * @return AnonymousResourceCollection
     */
    public function commend()
    {
        $goods = Goods::where('is_commend', true)->limit(6)->get();
        return GoodsResource::collection($goods);
    }

    /**
     * 商品列表
     * @param Request $request
     * @return AnonymousResourceCollection
     * @throws BindingResolutionException
     */
    public function list(Request $request)
    {
        $goods = Goods::site()->where('cid', request('cid'))->paginate(2);
        return GoodsResource::collection($goods);
    }

    /**
     * 商品列表
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $query = Goods::site()->with(['category', 'user', 'brand']);
        if (request('cid')) {
            $query->where('category_id', request('cid'));
        }
        if ($request->query('del')) {
            $query->whereNotNULL('del_at');
        } else {
            $query->whereNull('del_at');
        }

        return GoodsResource::collection($query->paginate(6));
    }

    public function store(GoodsRequest $request, Site $site, Goods $goods)
    {
        DB::beginTransaction();
        $goods->fill($request->input() + ['site_id' => $site['id'], 'user_id' => Auth::id()])->save();
        $this->updateGoodsAttributes($goods, $request->input('attributes'));
        DB::commit();
        return $this->message('商品添加成功');
    }

    public function show(Site $site, Goods $good)
    {
        return new GoodsResource($good->load('brand'));
    }

    public function update(GoodsRequest $request, Site $site, Goods $good)
    {
        DB::beginTransaction();
        $good->fill($request->input())->save();
        $this->updateGoodsAttributes($good, $request->input('attributes'));
        DB::commit();
        return $this->message('商品修改成功');
    }


    /**
     * 更新商品属性
     * @param mixed $goods 商品
     * @param mixed $attributes 属性列表
     * @return void
     */
    protected function updateGoodsAttributes($goods, $attributes)
    {
        if (empty($attributes)) return;
        //移除无效的属性
        $ids = collect($attributes)->map(fn ($attr) => $attr['id'] ?? 0);
        GoodsAttribute::where('goods_id', $goods['id'])->whereNotIn('id', $ids)->delete();

        //商品属性处理
        foreach ($attributes as $attribute) {
            $attribute['goods_id'] = $goods['id'];
            if ($attribute['attribute_value']) {
                GoodsAttribute::updateOrCreate(
                    ['id' => $attribute['id'] ?? ''],
                    $attribute
                );
            }
        }
    }

    public function destroy(Request $request, Site $site, Goods $good)
    {
        if ($request->query('force')) {
            //强制删除
            $good->delete();
        } else {
            //软删除只是标注
            $good->del_at = now();
            $good->save();
        }
        return $this->message('商品删除成功');
    }

    /**
     * 恢复商品
     * @param Site $site
     * @param Goods $goods
     * @return void
     * @throws InvalidCastException
     * @throws LogicException
     * @throws InvalidArgumentException
     * @throws BindingResolutionException
     */
    public function reset(Site $site, Goods $goods)
    {
        $goods['del_at'] = null;
        $goods->save();
        $this->message('商品恢复成功');
    }
}
