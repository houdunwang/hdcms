<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use App\Models\Site;
use Auth;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Modules\Shop\Entities\Brand;
use Modules\Shop\Http\Requests\BrandRequest;
use Modules\Shop\Transformers\BrandResource;

/**
 * 品牌
 * @package Modules\Shop\Api
 */
class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::site()->latest()->with('user')->paginate(10);
        return BrandResource::collection($brands);
    }

    public function store(BrandRequest $request, Site $site, Brand $brand)
    {
        $data = $request->input() + ['site_id' => $site->id, 'user_id' => Auth::id()];
        $brand->fill($data)->save();

        return $this->message('品牌添加成功');
    }

    public function show(Site $site, Brand $brand)
    {
        return new BrandResource($brand);
    }

    public function update(BrandRequest $request, Site $site, Brand $brand)
    {
        $brand->fill($request->input() + ['user_id' => Auth::id()])->save();
        return $this->message('品牌修改成功');
    }

    public function destroy(Site $site, Brand $brand)
    {
        $brand->delete();
        return $this->message('品牌删除成功');
    }
}
