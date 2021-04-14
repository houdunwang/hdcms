<?php

namespace Modules\Edu\Observers;

use Modules\Edu\Entities\Comment;
use DB;

/**
 * 评论观察
 * @package Modules\Edu\Observers
 */
class CommentObserver
{
    public function creating(Comment $comment)
    {
        // $comment['content'] = preg_replace('/@.*?\s/', '', $comment['content']);
    }

    public function created(Comment $comment)
    {
    }

    public function updated(Comment $comment)
    {
    }

    public function deleted(Comment $comment)
    {
        DB::table('edu_comment')->where('reply_comment_id', $comment['id'])->delete();
    }

    public function restored(Comment $comment)
    {
    }

    public function forceDeleted(Comment $comment)
    {
    }
}
