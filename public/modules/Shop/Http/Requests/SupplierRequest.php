<?php

namespace Modules\Shop\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * 供货商
 * @package Modules\Shop\Http\Requests
 */
class SupplierRequest extends FormRequest
{
    public function rules()
    {
        return [
            'title' => ['required'],
            'description' => ['required'],
        ];
    }

    public function attributes()
    {
        return ['title' => '供货商名称', 'description' => '供货商描述'];
    }

    public function authorize()
    {
        return true;
    }
}
