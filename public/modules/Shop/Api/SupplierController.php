<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use App\Models\Site;
use Auth;
use Modules\Shop\Entities\Supplier;
use Modules\Shop\Http\Requests\SupplierRequest;
use Modules\Shop\Transformers\SupplierResource;

/**
 * 供货商
 * @package Modules\Shop\Api
 */
class SupplierController extends Controller
{
    public function index()
    {
        $suppliers = Supplier::site()->latest()->with('user')->paginate(10);
        return SupplierResource::collection($suppliers);
    }

    public function store(SupplierRequest $request, Site $site, Supplier $supplier)
    {
        $data = $request->input() + ['site_id' => $site->id, 'user_id' => Auth::id()];
        $supplier->fill($data)->save();

        return $this->message('品牌添加成功');
    }

    public function show(Site $site, Supplier $supplier)
    {
        return new SupplierResource($supplier);
    }

    public function update(SupplierRequest $request, Site $site, Supplier $supplier)
    {
        $supplier->fill($request->input() + ['user_id' => Auth::id()])->save();
        return $this->message('品牌修改成功');
    }

    public function destroy(Site $site, Supplier $supplier)
    {
        $supplier->delete();
        return $this->message('品牌删除成功');
    }
}
