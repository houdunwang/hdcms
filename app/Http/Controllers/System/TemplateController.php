<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\Template;
use App\Services\TemplateService;
use Illuminate\Http\Request;

/**
 * 模板管理
 * @package App\Http\Controllers\Admin
 */
class TemplateController extends Controller
{
  public function index(TemplateService $templateService)
  {
    $templates = $templateService->all();

    if (request()->expectsJson()) {
      return $templates;
    }
    return view('system.template.index', compact('templates'));
  }

  public function installed(TemplateService $templateService)
  {
    return $templateService->allInstalled();
  }

  public function install($name, TemplateService $templateService)
  {
    $templateService->install($name);

    return back()->with('success', '模板安装成功');
  }

  public function uninstall(Template $template)
  {
    $template->delete();
    return response()->json(['message' => '模板删除成功']);
  }
}