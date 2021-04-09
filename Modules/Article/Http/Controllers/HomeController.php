<?php

namespace Modules\Article\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Article\Entities\Category;
use Modules\Article\Entities\Content;
use App\Models\Site;
use Browser;
use Exception;

class HomeController extends Controller
{
    /**
     * 网站首页
     *
     * @return void
     */
    public function home()
    {
        $this->defineTemplate();
        return view('home');
    }

    /**
     * 栏目页
     *
     * @param Category $category
     * @return void
     */
    public function category(Site $site, Category $category)
    {
        $this->defineTemplate();
        switch ($category->type) {
            case 1:
                return view('list', compact('category'));
            case 2:
                return view('index', compact('category'));
            case 3:
                return $category->url;
            case 4:
                return view($category->category_template, compact('category'));
        }
    }

    /**
     * 内容页
     *
     * @param Content $content
     * @return void
     */
    public function content(Site $site, Content $content)
    {
        $this->defineTemplate();
        $content['click'] += 1;
        $content->save();
        return view('content', compact('content'));
    }

    /**
     * 声明视图目录
     *
     * @return void
     */
    protected function defineTemplate()
    {
        try {
            $theme = config('module.template');
            $config = include base_path("modules/Article/template/{$theme}/config.php");
            $device = Browser::isMobile() ? $config['h5'] : $config['pca'];

            \View::addLocation(base_path("modules/Article/template/{$theme}/{$device}"));
        } catch (Exception $e) {
            abort('404', '模板文件不存在');
        }
    }
}
