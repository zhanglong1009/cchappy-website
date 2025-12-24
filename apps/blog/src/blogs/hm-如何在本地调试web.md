---
title: 如何使用Devtools工具调试web页面?
date: 2024-08-09
tags: [鸿蒙]
---
<!-- more --> 
# 使用Devtools工具调试前端页面
1. 配置hdc全局变量 <a style="color: #007acc;" href="https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/hdc-V5">点此查看</a>
2. 在web组件的代码里打开调试
```js
webview.WebviewController.setWebDebuggingAccess(true);
```
3. module.json5文件中增加如下权限
```js
  "requestPermissions":[
    {
      "name" : "ohos.permission.INTERNET"
    }
  ]

 ```
4. 将设备连接上电脑，在电脑端配置端口映射，配置方法如下：
```bash
hdc shell
cat /proc/net/unix | grep devtools //这一步会得到进程id 显示 webview_devtools_remote_3458
exit
// 配置进程id
hdc fport tcp:9222 localabstract:webview_devtools_remote_3458
hdc fport ls
```
5. 在电脑端Chrome浏览器地址栏中输入
`chrome://inspect/#devices`