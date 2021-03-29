<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Auth;
use Illuminate\Contracts\Container\BindingResolutionException;

/**
 * 微信规则
 * @package App\Http\Requests
 */
class WeChatMessageRequest extends FormRequest
{
    public function rules()
    {
        $rules = [
            'site_id' => ['required'],
            'wechat_id' => ['required'],
            'type' => ['required'],
            'title' => ['required'],
            'content' => [function ($attribute, $value, $fail) {
                if (in_array(request('type'), ['text', 'news']) && empty($value)) {
                    $fail('内容不能为空');
                }
            },],
            'keyword' => ['required', Rule::unique('we_chat_messages')->ignore(request('message'))->where(function ($query) {
                return $query->where('wechat_id', request('wechat')->id);
            })],

        ];

        return $rules;
    }

    public function attributes()
    {
        return [
            'site_id' => '站点',
            'wechat_id' => '微信公众号',
            'type' => '消息类型',
            'title' => '消息描述',
            'keyword' => '关键词',
            'content' => '回复内容'
        ];
    }
}
