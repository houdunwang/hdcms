<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use Auth;
use DB;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Modules\Shop\Entities\Coupon;
use Modules\Shop\Entities\Order;
use Modules\Shop\Entities\OrderGoods;

/**
 * 订单管理
 * @package Modules\Shop\Api
 */
class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum']);
    }

    public function index()
    {
    }

    public function store(Request $request, Order $order)
    {
        $goods = $request->input('goods');
        $coupon = $request->input('coupon');
        DB::beginTransaction();
        $order['site_id'] = site('id');
        $order['coupon_id'] = $coupon ? $coupon['id'] : null;
        $order['sn'] = Order::sn();
        $order['user_id'] = Auth::id();
        $order['price'] = $this->orderPrice($goods, $coupon);
        $order->save();
        //订单商品
        $this->addOrderGoods($order, $goods);
        DB::commit();
        return $this->message('订单添加成功');
    }

    /**
     * 订单商品
     * @param mixed $order
     * @param mixed $goods
     * @return void
     */
    protected function addOrderGoods($order, $goods)
    {
        foreach ($goods as $g) {
            OrderGoods::create([
                'order_id' => $order['id'],
                'goods_id' => $g['goods_id'],
                'product_id' => $g['product_id'],
            ]);
        }
    }

    /**
     * 订单总价
     * @param mixed $goods
     * @param mixed $coupon
     * @return mixed
     */
    protected function orderPrice($goods, $coupon)
    {
        $total = collect($goods)->reduce(function ($sum, $goods) {
            return $sum += $goods['price'];
        }, 0);
        if ($coupon) {
            switch ($coupon) {
                case Coupon::TYPE_FIXED_PRICE:
                    $total -= $coupon['value'];
                    break;
                case Coupon::TYPE_DISCOUNT:
                    $total *= $coupon['value'];
            }
        }
        return $total;
    }

    public function show($id)
    {
        return view('shop::show');
    }
}
