<?php

namespace Modules\Article\System;

use App\Models\WeChatMessage;
use Houdunwang\WeChat\Message;

/**
 * 处理模块自定义关键词消息
 * @package Modules\Article\System
 */
class Processor extends Message
{
    /**
     * 消息内容
     * @param WeChatMessage $message
     * @return string
     */
    public function handle(WeChatMessage $message)
    {
        $article = $message->messageable;
        return $this->news(
            [
                [
                    'title' => $article->title,
                    'description' => $article->description,
                    'picurl' => $article->preview,
                    'url' => route('article.content', $article)
                ]
            ]
        );
    }
}
