<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use App\Models\Site;
use Attribute;
use Auth;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Modules\Shop\Entities\AttributeType;
use Modules\Shop\Http\Requests\AttributeTypeRequest;
use Modules\Shop\Transformers\AttributeTypeResource;

/**
 * 属性类型
 * @package Modules\Shop\Http\Controllers
 */
class AttributeTypeController extends Controller
{
    public function index()
    {
        $attributeTypes = AttributeType::site()->with(['attributes', 'user'])->get();
        return AttributeTypeResource::collection($attributeTypes);
    }

    public function store(AttributeTypeRequest $request, Site $site, AttributeType $attributeType)
    {
        $attributeType->fill(['site_id' => site('id'), 'user_id' => Auth::id()] + $request->input())->save();
        return $this->message('属性类型保存成功');
    }

    public function show(Site $site, AttributeType $attributeType)
    {
        return new AttributeTypeResource($attributeType);
    }

    public function update(AttributeTypeRequest $request, Site $site, AttributeType $attributeType)
    {
        $attributeType->fill($request->input() + ['user_id' => Auth::id()])->save();
        return $this->message('属性类型更新成功');
    }

    public function destroy(Site $site, AttributeType $attributeType)
    {
        $attributeType->delete();
        return $this->message('属性类型删除成功');
    }
}
