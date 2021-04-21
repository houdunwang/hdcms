<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use App\Models\Site;
use Modules\Shop\Entities\Attribute;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Modules\Shop\Entities\AttributeType;
use Modules\Shop\Http\Requests\AttributeRequest;
use Modules\Shop\Transformers\AttributeResource;

class AttributeController extends Controller
{
    public function index(Site $site, AttributeType $type)
    {
        return AttributeResource::collection($type->attributes);
    }

    public function store(AttributeRequest $request, Site $site, AttributeType $type, Attribute $attribute)
    {
        // $attribute->fill($request->input() + ['attribute_type_id' => $type['id']]);
        // $type->attributes()->save($attribute);
        $type->attributes()->create($request->input());
        return $this->message('属性值添加成功');
    }

    public function show(Site $site, AttributeType $type, Attribute $attribute)
    {
        return new AttributeResource($attribute);
    }

    public function update(AttributeRequest $request, Site $site, AttributeType $type, Attribute $attribute)
    {
        $attribute->fill($request->input())->save();
        return $this->message('属性值修改成功');
    }

    public function destroy(Site $site, AttributeType $type, Attribute $attribute)
    {
        $attribute->delete();
        return $this->message('属性值删除成功');
    }
}
