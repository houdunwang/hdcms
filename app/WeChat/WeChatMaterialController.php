<?php

namespace App\WeChat;

use App\Http\Controllers\Controller;
use App\Http\Resources\WeChatMaterialResource;
use App\Http\Requests\WeChatMaterialRequest;
use App\Models\WeChatMaterial;
use App\Models\WeChat;
use Houdunwang\WeChat\Material;
use Illuminate\Http\Request;
use App\Models\Site;
use Exception;
use Illuminate\Contracts\Container\BindingResolutionException;
use UploadService;

/**
 * 素材管理
 * @package App\WeChat
 */
class WeChatMaterialController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(WeChatMaterial::class, 'material');
    }

    /**
     * 素材列表
     * @param WeChat $wechat
     * @return void
     */
    public function index(Request $request, Site $site, WeChat $wechat)
    {
        $materials = $wechat->materials()->with('module')->where('type', $request->type)->when($request->duration, function ($query, $duration) {
            if (request('type') != 'news') {
                return $query->where('duration',  $duration);
            }
        })->when($request->module, function ($query, $module) {
            return $query->where('module_id', $module);
        })->paginate(10);
        return WeChatMaterialResource::collection($materials);
    }

    /**
     * 获取素材
     * @param WeChatMaterial $material
     * @return WeChatMaterial
     */
    public function show(WeChatMaterial $material)
    {
        return new WeChatMaterialResource($material);
    }

    /**
     * 上传素材
     * 图片、音频、缩略图、视频
     * @param WeChatMaterialRequest $request
     * @param WeChat $wechat
     * @return void
     */
    public function store(WeChatMaterialRequest $request, Site $site, WeChat $wechat, WeChatMaterial $material)
    {
        $package = app(Material::class)->init($wechat);
        if ($request->type == 'news') {
            $response = $package->addNews($request->content);
        } else {
            $response = $package->add($request->input());
        }
        $wechat->materials()->create($request->input() + ['response' => $response]);
        return $this->message('素材添加成功', new WeChatMaterialResource($material));
    }

    /**
     * 更新素材
     *
     * @param WeChatMaterialRequest $request
     * @param WeChatMaterial $material
     * @return void
     */
    public function update(WeChatMaterialRequest $request, Site $site, WeChat $wechat,  WeChatMaterial $material)
    {
        if ($request->file != $material->file) {
            $material->response = app(Material::class)->init($wechat)->add($request->input());
        }
        $material->fill($request->except(['response']))->save();
        return $this->message('素材修改成功', new WeChatMaterialResource($material));
    }

    /**
     * 删除素材
     * @param Site $site
     * @param WeChat $wechat
     * @param WeChatMaterial $material
     * @return void
     * @throws Exception
     * @throws BindingResolutionException
     */
    public function destroy(Site $site, WeChat $wechat, WeChatMaterial $material)
    {
        try {
            //持久素材删除
            if ($material->duration == 'long') {
                app(Material::class)->init($wechat)->del($material->media['media_id']);
            }
        } finally {
            UploadService::delete($material->file);
            $material->delete();
            return $this->message('素材删除成功');
        }
    }
}
