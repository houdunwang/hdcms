<?php

namespace App\Services\Upload;

use Auth;
use Illuminate\Http\UploadedFile;
use OSS\OssClient;
use App\Models\Attachment;
use Exception;
use Illuminate\Contracts\Container\BindingResolutionException;
use OSS\Core\OssException;

/**
 * 文件上传
 * @package App\Services
 */
class UploadService
{
    /**
     * 站点上传
     * @param UploadedFile | String $file
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
     * @param UploadedFile $file
     * @return Attachment
     * @throws Exception
     * @throws BindingResolutionException
     */
    protected function local($file)
    {
        if ($file instanceof UploadedFile) {
            $path =  $file->store(date('Ym'), 'attachment');
            return $this->save(url("/attachments/{$path}"), $file->getsize(), $file->getClientOriginalName(), $file->extension(), 'local');
        } else if (is_file($file)) {
            $info = pathinfo($file);
            $to = 'attachments/' . date('Ym') . '/' . Auth::id() . date('his') . '.' . $info['extension'];
            copy($file, public_path($to));
            return $this->save(url($to), filesize($file), basename($to), $info['extension'], 'local');
        }
    }

    /**
     * 阿里云OSS
     * @param UploadedFile | String $file
     * @return Attachment
     */
    protected function oss($file): Attachment
    {
        if ($file instanceof UploadedFile) {
            $info = $this->ossUpload($file->path(), $file->extension());
            return $this->save($info['oss-request-url'], $file->getSize(), $file->getClientOriginalName(), $file->getExtension(), 'oss');
        } else if (is_file($file)) {
            $info = pathinfo($file);
            $oss = $this->ossUpload($file, $info['extension']);
            return $this->save($oss['oss-request-url'], filesize($file), $info['basename'], $info['extension'], 'oss');
        }
    }

    /**
     * OSS上传文件
     * @param mixed $file
     * @param mixed $extension
     * @return null
     * @throws BindingResolutionException
     * @throws OssException
     */
    protected function ossUpload($file, $extension)
    {
        $object = Auth::id() . '-' . date('Ymdhis') . '.' . $extension;
        $ossClient = new OssClient(config('site.aliyun.accessKeyId'), config('site.aliyun.accessKeySecret'), config('site.upload.oss.endpoint'));
        return $ossClient->uploadFile(config('site.upload.oss.bucket'), $object, $file);
    }

    /**
     * 保存入库
     * @param mixed $path 文件链接
     * @param mixed $size 文件大小
     * @param mixed $name 源文件名
     * @param string|null $type 上传方式
     * @return Attachment
     */
    protected function save($path, $size, $name = null, $extension = null, string $type = null): Attachment
    {
        return Attachment::create([
            'path' => $path,
            'site_id' => site('id'),
            'user_id' => Auth::id(),
            'module_id' => module('id'),
            'size' => $size,
            'type' => $type,
            'name' => $name,
            'extension' => $extension
        ]);
    }

    /**
     * 删除文章
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
