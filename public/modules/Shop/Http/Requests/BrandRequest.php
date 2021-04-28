<?php

namespace Modules\Shop\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BrandRequest extends FormRequest
{
    public function rules()
    {
        return [
            'title' => ['required'],
            'description' => ['required'],
            'logo' => ['required'],
        ];
    }

    public function attributes()
    {
        return ['title' => '品牌名称', 'description' => '品牌描述', 'logo' => '品牌标志'];
    }

    public function authorize()
    {
        return true;
    }
}
