<?php

namespace Modules\Edu\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * 贴子
 * @package Modules\Edu\Http\Requests
 */
class TopicRequest extends FormRequest
{
    public function rules()
    {
        return [
            'title' => ['required', 'min:3'],
            'content' => ['required', 'min:3']
        ];
    }

    public function authorize()
    {
        return true;
    }
}
