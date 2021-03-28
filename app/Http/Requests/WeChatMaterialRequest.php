<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Auth;

/**
 * 微信素材
 * @package App\Http\Requests
 */
class WeChatMaterialRequest extends FormRequest
{
    public function authorize()
    {
        return Auth::check();
    }

    public function rules()
    {
        return [
            'title' => ['required', 'between:3,20'],
            'type' => ['required'],
            'file' => ['exclude_if:type,news', 'required'],
            'duration' => ['exclude_if:type,news', 'required'],
            'content' => ['exclude_unless:type,news', 'required', 'min:1', 'array'],
            'description.title' => ['exclude_unless:type,video', 'required'],
            'description.introduction' => ['exclude_unless:type,video', 'required'],
        ];
    }

    public function attributes()
    {
        return [
            'title' => '素材描述',
            'type' => '素材类型',
            'file' => '素材文件',
            'duration' => '素材时长类型',
            'content' => '文章内容',
            'description.title' => '视频标题',
            'description.introduction' => '视频描述'
        ];
    }
}
