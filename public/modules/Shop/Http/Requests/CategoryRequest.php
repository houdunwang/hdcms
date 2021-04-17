<?php

namespace Modules\Shop\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * 栏目验证
 * @package Modules\Shop\Http\Requests
 */
class CategoryRequest extends FormRequest
{

    public function rules()
    {
        return [
            'title' => ['required'],
            'preview' => ['required'],
            'unit' => ['required'],
            'pid' => ['required'],
            'description' => ['nullable', 'max:200']
        ];
    }

    public function attributes()
    {
        return [
            'title' => '栏目名称',
            'preview' => '栏目图片',
            'pid' => '所属栏目',
            'unit' => '商品单位',
            'description' => '栏目介绍'
        ];
    }

    public function authorize()
    {
        return true;
    }
}
