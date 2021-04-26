<?php

namespace Modules\Shop\Observers;

use Illuminate\Database\Eloquent\InvalidCastException;
use Illuminate\Contracts\Container\BindingResolutionException;
use Modules\Shop\Entities\Goods;
use Image;
use LogicException;
use Intervention\Image\Exception\NotSupportedException;
use Intervention\Image\Exception\NotReadableException;
use Intervention\Image\Exception\NotWritableException;
use UploadService;

class GoodsObserver
{
    public function creating(Goods $goods)
    {
        $goods['sn'] = $goods['sn'] ?? Goods::sn();
        $this->makeThumb($goods);
    }

    /**
     * 生成缩略图
     * @param Goods $goods
     * @return void
     * @throws InvalidCastException
     * @throws LogicException
     * @throws NotSupportedException
     * @throws NotReadableException
     * @throws BindingResolutionException
     * @throws NotWritableException
     */
    protected function makeThumb(Goods $goods)
    {
        if ($goods['thumb']) return;
        $info  = pathinfo($goods['preview']);
        $file = public_path("temp.{$info['extension']}");
        Image::make($goods['preview'])->fit(config('module.goods.thumb_width', 300), config('module.goods.thumb_height', 300))->save($file, 80);
        $goods['thumb'] = UploadService::make($file)->path;
        unlink($file);
    }

    public function created(Goods $goods)
    {
    }

    public function updating(Goods $goods)
    {
        $goods['sn'] = $goods['sn'] ?? Goods::sn();
        $this->makeThumb($goods);
    }
    /**
     * Handle the Goods "updated" event.
     *
     * @param  \App\Models\Goods  $goods
     * @return void
     */
    public function updated(Goods $goods)
    {
        //
    }

    /**
     * Handle the Goods "deleted" event.
     *
     * @param  \App\Models\Goods  $goods
     * @return void
     */
    public function deleted(Goods $goods)
    {
        //
    }

    /**
     * Handle the Goods "restored" event.
     *
     * @param  \App\Models\Goods  $goods
     * @return void
     */
    public function restored(Goods $goods)
    {
        //
    }

    /**
     * Handle the Goods "force deleted" event.
     *
     * @param  \App\Models\Goods  $goods
     * @return void
     */
    public function forceDeleted(Goods $goods)
    {
        //
    }
}
