<?php

namespace Modules\Shop\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * 属性值
 * @package Modules\Shop\Http\Requests
 */
class AttributeRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => ['required'],
            'type' => ['required'],
            'form_type' => ['required']
        ];
    }

    public function attributes()
    {
        return [
            'title' => '属性值名称称',
            'type' => '属性类型',
            'form_type' => '表单类型'
        ];
    }
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
}
