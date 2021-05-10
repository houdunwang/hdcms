<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use App\Models\Site;
use Auth;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Modules\Shop\Entities\Address;
use Modules\Shop\Entities\ShopUser;
use Modules\Shop\Http\Requests\AddressRequest;
use Modules\Shop\Transformers\AddressResource;

/**
 * 地址管理
 * @package Modules\Shop\Api
 */
class AddressController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth:sanctum']);
    }

    public function index()
    {
        $address = ShopUser::user()->address;
        return AddressResource::collection($address);
    }

    public function store(AddressRequest $request, Site $site, Address $address)
    {
        $address->site_id = $site['id'];
        $address->user_id = Auth::id();
        $address->fill($request->input());
        //当前地址为默认值时，撤销其他默认地址
        if ($request->is_default) {
            ShopUser::user()->address()->update(['is_default' => false]);
        }
        //只有一个地址时设置为默认
        if (!ShopUser::user()->address()->exists()) {
            $address->is_default = true;
        }
        $address->save();
        return $this->message('地址添加成功');
    }

    public function update(Request $request, Site $site, Address $address)
    {
        $address->fill($request->input());
        if ($request->is_default) {
            ShopUser::user()->address()->update(['is_default' => false]);
        }
        //只有一个地址时设置为默认
        if (!ShopUser::user()->address()->exists()) {
            $address->is_default = true;
        }
        $address->save();
        return $this->message('地址修改成功');
    }

    public function destroy(Site $site, Address $address)
    {
        $address->delete();
        return $this->message('地址删除成功');
    }
}