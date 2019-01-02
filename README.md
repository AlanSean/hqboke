## PWA实战，Lighthouse测试


    * 离线时，start_url不响应200  
    * 表单元素没有关联的标签

[网站地址](https://www.hqboke.cn)

[serviceWorker配置要素](https://github.com/AlanSean/hqboke/blob/master/serviceWorker%E9%85%8D%E7%BD%AE~%E8%A6%81%E7%B4%A0%20%E4%BB%A5%E5%8F%8A%E6%B3%A8%E6%84%8F%E7%82%B9.md)

[HTTP2配置](https://github.com/AlanSean/hqboke/blob/master/serviceWorker%E9%85%8D%E7%BD%AE~%E8%A6%81%E7%B4%A0%20%E4%BB%A5%E5%8F%8A%E6%B3%A8%E6%84%8F%E7%82%B9.md)

```
    manifest配置
    初始化资源 放到body后面
    添加noscript（禁用js提示）


```



### 日志
    新增 link rel=dns-prefetch href=https://hqboke.cn  DNS预获取 减少dns请求
    新增 link  rel="preload" css|js预加载
    添加 from 表单
