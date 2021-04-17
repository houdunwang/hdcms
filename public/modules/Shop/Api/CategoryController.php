<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Modules\Shop\Http\Requests\CategoryRequest;
use Modules\Shop\Entities\Category;
use App\Models\Site;
use Illuminate\Support\Facades\DB;
use Modules\Shop\Transformers\CategoryResource;

/**
 * 栏目控制器
 * @package Modules\Shop\Api
 */
class CategoryController extends Controller
{
    public function index(Site $site)
    {
        $sites = Category::site()->orderByRaw("concat(path,'-',id) asc")->get();
        return CategoryResource::collection($sites);
    }

    public function store(CategoryRequest $request, Site $site, Category $category)
    {
        $category->fill($request->all() + ['site_id' => $site['id']]);
        //栏目多级路径
        if ($pid = $request->pid) {
            $category['path'] = Category::find($pid)->path . '-' . $pid;
        }
        $category->save();
        return $this->message('栏目添加成功');
    }

    public function show(Site $site, Category $category)
    {
        return new CategoryResource($category);
    }

    public function update(CategoryRequest $request, Site $site, Category $category)
    {
        DB::beginTransaction();
        $category->fill(['path' => 0] + $request->all());
        //栏目多级路径
        if ($pid = $request->pid) {
            $category['path'] = Category::find($pid)->path . '-' . $pid;
        }
        $category->save();
        //子栏目同时修改
        $this->changeChildPath($category);
        DB::commit();
        return $this->message('栏目编辑成功');
    }

    /**
     * 修改子栏目
     * @param mixed $category
     * @return void
     */
    protected function changeChildPath($category)
    {
        Category::all()->each(function ($c) use ($category) {
            $c['path'] = preg_replace([
                "/^.*\-" . $category['id'] . "$/i",
                "/^.*\-" . $category['id'] . "-/i",
            ], [
                $category['path'] . '-' . $category['id'],
                $category['path'] . '-' . $category['id'] . '-',
            ], $c['path']);
            $c->save();
        });
    }

    public function destroy(Site $site, Category $category)
    {
        $category->delete();
        return $this->message('栏目删除成功');
    }
}
