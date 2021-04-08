<?php

namespace App\Api;

use App\Http\Controllers\Controller;
use Artisan;
use Exception;

/**
 * 安装系统
 * @package App\Http\Controllers
 */
class InstallController extends Controller
{
    /**
     * 导入数据
     * @return string|void
     */
    public function migration()
    {

        if (IS_INSTALL) {
            abort(403, '系统已经安装');
        }
        try {
            Artisan::call('migrate:fresh --seed');
            return 'success';
        } catch (Exception $e) {
            return 'Error:' . $e->getMessage();
        }
    }
}
