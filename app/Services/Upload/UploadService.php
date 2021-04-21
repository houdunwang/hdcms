<?php

namespace App\Services\Upload;

use Auth;
use Illuminate\Http\UploadedFile;
use OSS\OssClient;
use App\Models\Attachment;
use Exception;
use Illuminate\Contracts\Container\BindingResolutionException;
use Storage;

/**
 * 文件上传
 * @package App\Services
 */
class UploadService
{
    /**
     * 文件上传处理
     * @param mixed $file
     * @return mixed
     * @throws BindingResolutionException
     */
    public function make($file)
    {
        $driver = config('site.upload.driver', 'local');
        return $this->$driver($file);
    }

    /**
     * 本地上传
     * @param mixed $file
     * @return Attachment|void
     * @throws BindingResolutionException
     * @throws Exception
     */
    protected function local($file)
    {
        if (is_string($file)) {
            $info  = pathinfo($file);
            $path = 'attachments/' . date('Ym') . '/' . date('Ymdhis') . '.' . $info['extension'];
            copy($file, $path);
            return $this->save(url($path), filesize($file), basename($file), 'local');
        } else if ($file instanceof UploadedFile) {
            $path = $file->store(date('Ym'), 'attachment');
            return $this->save(url("/attachments/{$path}"), $file->getsize(), $file->getClientOriginalName(), 'local');
        }
    }

    /**
     * 阿里云OSS
     * @param mixed $file
     * @return Attachment
     * @throws BindingResolutionException
     */
    protected function oss($file): Attachment
    {
        if (is_string($file)) {
            $info = $this->ossUploadFile($file, pathinfo($file)['extension']);
            return $this->save($info['oss-request-url'], filesize($file), basename($file), 'oss');
        } else if ($file instanceof UploadedFile) {
            $info = $this->ossUploadFile($file->path(), $file->extension());
            return $this->save($info['oss-request-url'], $file->getsize(), $file->getClientOriginalName(), 'oss');
        }
    }

    /**
     * OSS客户端
     * @return OssClient
     * @throws BindingResolutionException
     */
    protected function ossUploadFile($file, $extension)
    {
        $object = Auth::id() . '-' . date('Ymdhis') . '.' . $extension;
        $ossClient = new OssClient(config('site.aliyun.accessKeyId'), config('site.aliyun.accessKeySecret'), config('site.upload.oss.endpoint'));
        return $ossClient->uploadFile(config('site.upload.oss.bucket'), $object, $file);
    }

    /**
     * 保存入库
     * @param mixed $url  文件链接
     * @param mixed $size 大小
     * @param mixed $name 文件名
     * @param mixed $type 上传方式
     * @return Attachment
     */
    protected function save($url, $size, $name, $type): Attachment
    {
        return Attachment::create([
            'path' => $url,
            'site_id' => site('id'),
            'user_id' => Auth::id(),
            'module_id' => module('id'),
            'size' => $size,
            'type' => $type,
            'name' => $name,
            'extension' => pathinfo($url)['extension']
        ]);
    }

    /**
     * 删除文件
     * @param string $path
     * @return void
     */
    public function delete(?string $path)
    {
        $attachment = Attachment::where('path', $path)->first();
        if ($attachment) {
            //todo 删除oss
            $attachment->delete();
        }
    }
}
