
## 什么是 uniCloud 
uniCloud 是 DCloud 联合阿里云、腾讯云，为开发者提供的基于 serverless 模式和 js 编程的云开发平台，更多请参考[uniCloud文档](https://uniapp.dcloud.io/uniCloud)。

## 云端一体页面的优势是什么
过去，开发一个列表，需要在后端设计数据库，提供接口，前端写列表，处理分页、下拉刷新，并保证长列表的性能，全套工作下来需要1、2天。

现在有了云端一体列表，上述工作都不用做了，页面拿来就用。

在HBuilderX 2.9+，新建页面时，可以直接选择大量云端一体页面模板，数据库、后台接口、前端页面都有了。

当然，您也可以调整，自定义数据库表和前端的ui。

## 后台数据表
后台数据表使用 [openDB](https://gitee.com/dcloud/opendb/tree/master) 设计规范，它约定了一个标准用户表的表名和字段定义，并且基于nosql的特性，可以由开发者自行扩展字段。`openDB`是[uniCloud](https://uniapp.dcloud.io/uniCloud/README)的重要软基建，支撑`uniCloud`数字生态的发展。


## 页面模板简介

这是与新闻列表（见最下方地址）结合使用的云端一体的新闻详情模版。

本模版有如下特征：

- 遵循 `openDB` 的 [opendb-mall-goods](https://gitee.com/dcloud/opendb/tree/master/collection/opendb-mall-goods)结构
- 基于 [uni-clientDB](https://ext.dcloud.net.cn/plugin?id=2314) 操作数据库

**Tips**
- 暂不支持 nvue 页面

## 使用说明

1. 在 `cloudfunctions` 目录，右键上传所有云函数及公共模块
2. 在 `cloudfunctions` > `db_init.json` 文件，右键初始化数据库，数据结构参考 `openDB` 的[opendb-news-articles](https://gitee.com/dcloud/opendb/tree/master/collection/opendb-news-articles)表结构
3. 运行到 Chrome 查看效果

## 代码说明

> 代码逻辑以及样式见代码示例

## 样式覆盖

直接修改 `style` 中样式或自己新增删除样式即可

## 其他模板样式

1. 云端一体混合布局：[https://ext.dcloud.net.cn/plugin?id=2546](https://ext.dcloud.net.cn/plugin?id=2546)
2. 云端一体垂直布局，大图模式：[https://ext.dcloud.net.cn/plugin?id=2583](https://ext.dcloud.net.cn/plugin?id=2583)
3. 云端一体垂直布局，多行图文混排：[https://ext.dcloud.net.cn/plugin?id=2584](https://ext.dcloud.net.cn/plugin?id=2584)
4. 云端一体垂直布局，多图模式：[https://ext.dcloud.net.cn/plugin?id=2585](https://ext.dcloud.net.cn/plugin?id=2585)
5. 云端一体水平布局，左图右文：[https://ext.dcloud.net.cn/plugin?id=2586](https://ext.dcloud.net.cn/plugin?id=2586)
6. 云端一体水平布局，左文右图：[https://ext.dcloud.net.cn/plugin?id=2587](https://ext.dcloud.net.cn/plugin?id=2587)
7. 云端一体垂直布局，无图模式，主标题+副标题：[https://ext.dcloud.net.cn/plugin?id=2588](https://ext.dcloud.net.cn/plugin?id=2588)