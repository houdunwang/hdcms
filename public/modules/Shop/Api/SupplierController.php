<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use App\Models\Site;
use Auth;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Modules\Shop\Entities\Supplier;
use Modules\Shop\Http\Requests\SupplierRequest;
use Modules\Shop\Transformers\SupplierResource;

class SupplierController extends Controller
{
    public function index()
    {
        $suppliers = Supplier::site()->with('user')->paginate(10);
        return SupplierResource::collection($suppliers);
    }

    public function store(SupplierRequest $request, Site $site, Supplier $supplier)
    {
        $supplier->fill($request->input() + ['site' => $site['id'], 'user_id' => Auth::id()])->save();

        return $this->message('供货商添加成功');
    }

    public function show(Site $site, Supplier $supplier)
    {
        return new SupplierResource($supplier);
    }

    public function update(SupplierRequest $request, Site $site, Supplier $supplier)
    {
        $supplier->fill($request->input())->save();
        return $this->message('供货商添加成功');
    }

    public function destroy(Site $site, Supplier $supplier)
    {
        $supplier->delete();
        return $this->message('供货商删除成功');
    }
}
