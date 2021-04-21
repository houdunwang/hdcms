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
        $goods['site_id'] = site('id');
        $goods['sn'] = $goods['sn'] ?? Goods::sn();
        $this->createThumbImage($goods);
    }

    /**
     * 生成缩略图
     * @param Goods $goods
     * @return void
     * @throws InvalidCastException
     * @throws LogicException
     * @throws BindingResolutionException
     * @throws NotSupportedException
     * @throws NotReadableException
     * @throws NotWritableException
     */
    protected function createThumbImage(Goods $goods)
    {
        if (!$goods['thumb']) {
            $info = pathinfo($goods['preview']);
            $file = public_path('temp.' . $info['extension']);
            Image::make($goods['preview'])->fit(300, 300)->save($file);
            $goods['thumb'] = UploadService::make($file)->path;
            unlink($file);
        }
    }

    public function created(Goods $goods)
    {
    }

    public function updated(Goods $goods)
    {
    }

    public function deleted(Goods $goods)
    {
    }

    public function restored(Goods $goods)
    {
    }

    public function forceDeleted(Goods $goods)
    {
    }
}
