<?php

namespace Modules\Shop\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * 地址
 * @package Modules\Shop\Http\Requests
 */
class AddressRequest extends FormRequest
{
    public function rules()
    {
        return [
            'consignee' => ['required'],
            'district' => ['required'],
            'info' => ['required'],
            'tel' => ['required'],
        ];
    }

    public function attributes()
    {
        return [
            'consignee' => '收货人',
            'district' => '所在地区',
            'info' => '详细地址',
            'tel' => '联系方式'
        ];
    }

    public function authorize()
    {
        return true;
    }
}
