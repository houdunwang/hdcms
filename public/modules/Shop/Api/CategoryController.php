<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Modules\Shop\Http\Requests\CategoryRequest;
use Modules\Shop\Entities\Category;
use App\Models\Site;
use Auth;
use Illuminate\Support\Facades\DB;
use Modules\Shop\Transformers\CategoryResource;
use Modules\Shop\Transformers\GoodsResource;

/**
 * 栏目控制器
 * @package Modules\Shop\Api
 */
class CategoryController extends Controller
{
    public function __construct()
    {
        // $this->middleware(['auth:sanctum'])->only(['index']);
    }

    /**
     * 两级栏目列表
     * @return void
     */
    public function all_chilren()
    {
        $all = Category::site()->get();
        $categories = Category::site()->where('pid', 0)->get()->each(function ($category) use ($all) {
            $children = [];
            foreach ($all as $c) {
                if ($c['pid'] == $category['id'] || strstr($c['path'], "-{$category['id']}-")) {
                    $children[] = $c;
                }
            }
            $category['children'] = $children;
        });

        return $categories;
    }

    /**
     * 推荐栏目商品
     * @return mixed
     */
    public function goodsList()
    {
        $categories = Category::whereNotNULL('goods_total')->where('is_commend', true)->limit(request('row', 6))->get()->map(function ($category) {
            $goods = $category->goods()->select('id', 'title', 'description', 'price', 'market_price', 'preview')->where('is_commend', true)->limit(6)->get();
            $category['goods'] = $goods;
            return $category;
        });
        return $categories;
    }

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
