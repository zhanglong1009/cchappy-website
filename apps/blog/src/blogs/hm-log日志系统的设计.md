---
title: 从 0 到 1：我如何设计一套可靠的 App 日志上报系统
date: 2025-10-08
tags: [鸿蒙]
---
完整的记录我在项目中落地的一套 客户端日志系统：
本地缓冲 + Pending 队列 + 定时上报 + 发送锁，重点解决日志可靠性与重复发送问题。
<!-- more --> 
## 日志上报系统整体流程
![效果演示](../images/log.png)

### 1. 配置
在初始化时，会进行简单的配置
```js
{
    url:string  // log请求的api
    minRecordLogLevel:LogLevel // 日志最小记录等级
    device: string // 设备名
    token:string // 用户token
    ...
}
```
### 2. 封装log调用函数
为了让项目能简便的调用log，会封装一系列的方法，比如  
- log.i()  info级别的日志
- log.d()  debug调试日志
- log.e()  error 报错日志
  
### 3. 日志记录并缓存
当调用log.e 等方法时，会进入一个统一的入口，里面会判断local日志条数和日志的重要程度来走不同的逻辑分支
```js
// 核心逻辑
if(isImportant || localLength >=10 || logSize >= 4kb){
    // 这个方法会把local里面的日志全部移动到pending里面去，然后删除local里面的
    Pengding.addLocal()
}

//如果不满足，会把日志存在 Preferences里面，日志通过分割符分割
PreferencesUtil.putSync(KEY_LOG_LOCAL,localList.join(':::'))
```
### 4. pending日志发送
当app启动时，会触发一个计时器，当倒计时结束后，会把pending里面的数据send到后端
```js
 if(pending.length >0 ){
    pending.tick()
 }

// 这里会把请求放在一个锁里面
 tick(){
    taskRunner.runRecordBlock(async ()=>{
        await run()
    })
 }

 //runRecordBlock的实现
 class TaskRunner{
    private lock: Promise<void> = Promise.reslove()
    rrunRecordBlock(block: ()=> Promise<void>: void){
        this.lock = this.lock.then(async ()=>{
            try{
                await block()
            }catch(e){
                log.e('err msg')
            }
        })
    }
 }
```