<?php

namespace Modules\Shop\Api;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Shop\Entities\Goods;
use Modules\Shop\Transformers\GoodsResource;

/**
 * 搜索
 * @package Modules\Shop\Api
 */
class SearchController extends Controller
{
    /**
     * 商品搜索
     * @param Request $request
     * @return string|array|null
     */
    public function goods(Request $request)
    {
        $key = $request->query('w');
        $goods = Goods::site()->where('title', 'like', "%{$key}%")->orWhere('description', 'like', "%{$key}%")->limit(10)->get();
        return GoodsResource::collection($goods);
    }
}
