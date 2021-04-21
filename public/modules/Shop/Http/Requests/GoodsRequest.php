<?php

namespace Modules\Shop\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * 商品
 * @package Modules\Shop\Http\Requests
 */
class GoodsRequest extends FormRequest
{
    public function rules()
    {
        return [
            'title' => ['required'],
            'category_id' => ['required'],
            'preview' => ['required']
        ];
    }

    public function attributes()
    {
        return ['title' => '商品名称', 'category_id' => '栏目', 'preview' => '商品图片'];
    }

    public function authorize()
    {
        return true;
    }
}
