---
title: Token无感刷新
date: 2024-03-12 14:00:00
tags: [业务]
---
基于axios的token无感刷新，用户登录接口会返回两个token，一个 access_token（30分钟有效期），一个 refresh_token（7天有效期）。访问接口需要在请求头带上 access_token，如果access_token过期，则需要使用refresh_token去重新获取access_token。实现用户无感刷新token效果。``双token一般用于单点登录(单点登录会在之后的文章中更新)``
<!-- more -->
```js
// 任务队列接口
interface PendingTask {
    config: AxiosRequestConfig
    resolve: Function
}
let refreshing = false; //加入标识，防止多个并发请求多次刷新token
const queue: PendingTask[] = [];

//响应拦截器
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        let { data, config } = error.response;

        // 如果token正在刷新中，将请求加入到队列里
        if(refreshing) {
            return new Promise((resolve) => {
                queue.push({
                    config,
                    resolve
                });
            });
        }


        // 当返回状态码为401时(后台约定),则进行token刷新
        if (data.statusCode === 401 && !config.url.includes('/refresh')) {
            refreshing = true;
            
            // 执行token刷新接口
            const res = await refreshToken();

            refreshing = false;

            if(res.status === 200) {

                // token刷新成功，则重新发送队列里的请求
                queue.forEach(({config, resolve}) => {
                    resolve(axiosInstance(config))
                })
                //清空队列，防止重复执行
                queue = []

                return axiosInstance(config);
            } else {
                alert('登录过期，请重新登录');
            }
        } else {
            return error.response;
        }
    }
)


// 请求拦截器
axiosInstance.interceptors.request.use(function (config) {

    // 获取token，缓存在内存中
    const accessToken = localStorage.getItem('access_token');

    if(accessToken) {
        // 设置请求头
        config.headers.authorization = 'Bearer ' + accessToken;
    }
    return config;
})


//刷新token接口
async function refreshToken() {
    const res = await axiosInstance.get('/refresh', {
        params: {
          token: localStorage.getItem('refresh_token')
        }
    });
    localStorage.setItem('access_token', res.data.accessToken);
    localStorage.setItem('refresh_token', res.data.refreshToken);
    return res;
}
```