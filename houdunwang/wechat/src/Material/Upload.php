<?php

namespace Houdunwang\WeChat\Material;

use Exception;
use Http;

/**
 * 上传素材
 */
trait Upload
{
    /**
     * 添加素材
     * @param array $data
     * @return mixed
     * @throws Exception
     */
    public function add(array $data)
    {
        //临时或永久素材上传地址
        $url = $data['duration'] == 'short' ? 'media/upload' : 'material/add_material';
        $api = $this->api . "/{$url}?access_token=" . $this->token() . "&type=" . $data['type'];
        $response = Http::attach('media', file_get_contents($data['file']), basename($data['file']))
            ->post($api, ['description' => json_encode($data['description'] ?? [], JSON_UNESCAPED_UNICODE)])->json();
        return $this->return($response);
    }

    /**
     * 新增永久图文素材
     * @param array $data
     * @return mixed
     */
    public function addNews(array $data)
    {
        $api = $this->api . '/material/add_news?access_token=' . $this->token();
        $response = Http::withBody(json_encode(['articles' => $data], JSON_UNESCAPED_UNICODE), 'application/json')->post($api)->json();
        return $this->return($response);
    }

    /**
     * 上传图文素材内的图片
     * @param string $file
     * @return mixed
     * @throws Exception
     */
    public function uploadNewsImage(string $file)
    {
        $api = $this->api . '/media/uploadimg?access_token=' . $this->token();
        $response = Http::attach('media', file_get_contents($file), basename($file))->post($api)->json();
        return $this->return($response);
    }
}
