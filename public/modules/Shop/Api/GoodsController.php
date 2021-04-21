<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use App\Models\Site;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Modules\Shop\Entities\Goods;
use Modules\Shop\Http\Requests\GoodsRequest;

class GoodsController extends Controller
{
    public function index()
    {
    }

    public function store(GoodsRequest $request, Site $site, Goods $goods)
    {
        $goods->fill($request->input())->save();
        return $this->message('商品添加成功');
    }

    public function show($id)
    {
    }

    public function update(Request $request, $id)
    {
    }

    public function destroy($id)
    {
        //
    }
}
