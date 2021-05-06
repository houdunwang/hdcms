<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Modules\Shop\Entities\ShopUser;

/**
 * 用户优惠券
 * @package Modules\Shop\Http\Controllers
 */
class UserCouponController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum']);
    }

    public function index()
    {
        return ShopUser::user()->coupons;
    }

    public function store(Request $request)
    {
        ShopUser::user()->attach([$request->input('coupon')]);
        return $this->message('购物券添加成功');
    }

    public function show($id)
    {
        return view('shop::show');
    }

    public function update(Request $request, $id)
    {
    }

    public function destroy($id)
    {
    }
}
