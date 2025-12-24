---
title: 鸿蒙开发中遇到的问题
date: 2024-09-09
tags: [鸿蒙]
---
记录一下在鸿蒙开发时遇到的问题
<!-- more --> 
### 使用动画animation，不生效
animation属性一定要写在动效属性的后面，比如高度变化，那么animation的属性就要放在height属性后面

### 使用Navigation进行跳转时，白屏
问题出现：使用git进行分支切换时，会大概率发生该bug  
解决方案：
将route_map.json文件下的pageSourceFile的路径重新输入一遍

### 在@Builder中使用this，传递给子组件时，不触发视图更新
1. 使用@LocalBuilder，使this指向当前所属组件(推荐)
2. 在Builder使用的地方，加上.bind(this)(不推荐)
   
### 设置NavDestination的menu属性时不生效
原因：
如果你没有设置title，或者hideTitleBar设为了true，则menu也会跟着隐藏。  
解决方法：
1. hideTitleBar设为false，并且title需要定义，哪怕是个""。这种方法他会展示返回的按钮
2. 如果不想要返回的按钮，还想展示菜单栏，可以使用定位组件，去自定义页面的菜单位置