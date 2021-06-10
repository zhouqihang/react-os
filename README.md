# React-OS

使用React开发的模仿MacOS系统的小项目

## 开发

```shell
$ npm install
$ npm run dev
```

## TODO

* 实现APP组件，用于提供应用与系统的交互能力。
* 实现菜单组件（用于系统菜单）当应用发生变化，系统去调用app的`getSystemMenu`方法获取菜单并渲染，点击菜单的某一项时，调用app的`getMenuConfig`方法获取当前项的下拉菜单，最终点击菜单某一项的时候，Menu组件会调用`handler`，在`handler`中调用app的`onSystemMenuSelect`方法，最终由app决定执行什么动作。
* 实现一个简单的文本编辑器应用（APP）
* 实现APP与系统的交互，包含更改顶部系统菜单，底部Docker栏添加图标
* 实现系统设置APP，支持更改桌面、设置时间格式等功能
* 添加数据存储，默认存储在IndexDB中，设计并预留接口以供后期将数据同步到nodejs