<?php

namespace Modules\Edu\Api;

use ActivityService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Edu\Entities\Comment;
use Modules\Edu\Entities\Topic;
use Modules\Edu\Http\Requests\CommentRequest;
use Modules\Edu\Notifications\CommentNotification;
use Modules\Edu\Transformers\CommentResource;
use Illuminate\Auth\Access\AuthorizationException;
use Exception;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\InvalidCastException;
use LogicException;
use Modules\Edu\Entities\Video;
use App\Models\Site;
use Auth;
use DB;

/**
 * 评论
 * @package Modules\Edu\Api
 */
class CommentController extends Controller
{
    /**
     * 评论列表
     * @param Topic $topic
     * @return AnonymousResourceCollection
     */
    public function topic(Site $site, Topic $topic)
    {
        $comments = $topic->comments()->whereNull('reply_comment_id')->latest('id')->paginate(15);
        return CommentResource::collection($comments);
    }

    /**
     * 发表评论
     * @param Request $request
     * @param Topic $topic
     * @return void
     * @throws BindingResolutionException
     */
    public function topicSend(CommentRequest $request, Site $site, Topic $topic)
    {
        $comment = $topic->comments()->create($request->input() + [
            'site_id' => site('id'),
            'user_id' => Auth::id()
        ]);
        if (Auth::id() != $topic->user->id) {
            $topic->user->notify(new CommentNotification($comment));
        }
        ActivityService::log($comment);
        return $this->message('评论发表成功', new CommentResource($comment->load(['user'])));
    }

    /**
     * 评论列表
     * @param Video $video
     * @return AnonymousResourceCollection
     */
    public function video(Site $site, Video $video)
    {
        $comments = $video->comments()->whereNull('reply_comment_id')->latest()->paginate();
        return CommentResource::collection($comments);
    }

    /**
     * 发表评论
     * @param Request $request
     * @param Video $video
     * @return void
     * @throws BindingResolutionException
     */
    public function videoSend(CommentRequest $request, Site $site, Video $video)
    {
        $comment = $video->comments()->create($request->input() + [
            'site_id' => site('id'),
            'user_id' => Auth::id()
        ]);
        if (Auth::id() != $video->lesson->user->id) {
            $video->user->notify(new CommentNotification($comment));
        }
        ActivityService::log($comment);
        return $this->message('评论发表成功', new CommentResource($comment));
    }

    /**
     * 删除评论
     * @param Comment $comment
     * @return void
     * @throws AuthorizationException
     * @throws Exception
     * @throws BindingResolutionException
     */
    public function destroy(Site $site, Comment $comment)
    {
        DB::beginTransaction();
        $this->authorize('delete', $comment);
        $comment->delete();
        DB::commit();
        return $this->message('评论删除成功');
    }

    /**
     * 评论所在页码
     * @param Comment $comment
     * @return float|false
     * @throws InvalidCastException
     * @throws LogicException
     */
    public function page($id, $cid)
    {
        $total = Comment::where('comment_id', $id)->where('id', '>=', $cid)->whereNull('reply_comment_id')->latest('id')->count();
        return ceil($total / 15);
    }
}
