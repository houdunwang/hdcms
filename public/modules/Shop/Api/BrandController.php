<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use App\Models\Site;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Modules\Shop\Entities\Brand;
use Modules\Shop\Http\Requests\BrandRequest;
use Modules\Shop\Transformers\BrandResource;
use Auth;

/**
 * 品牌
 * @package Modules\Shop\Api
 */
class BrandController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum'])->only(['store', 'update', 'delete']);
    }

    public function index(Site $site)
    {
        $brands = Brand::site()->latest('id')->with(['user'])->paginate(10);
        return BrandResource::collection($brands);
    }

    public function store(BrandRequest $request, Site $site, Brand $brand)
    {
        $brand->fill($request->input() + ['site_id' => $site['id'], 'user_id' => Auth::id()])->save();
        return $this->message('品牌添加成功');
    }

    public function show(Site $site, Brand $brand)
    {
        return new BrandResource($brand);
    }

    public function update(BrandRequest $request, Site $site, Brand $brand)
    {
        $brand->fill($request->input())->save();
        return $this->message('品牌更新成功');
    }

    public function destroy(Site $site, Brand $brand)
    {
        $brand->delete();
        return $this->message('品牌删除成功');
    }
}
