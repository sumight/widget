# 控件抽象类

在编写前端控件的时候有一些重复的操作可以抽象出来，比如获取配置，比如渲染。抽象类中就把这两个操作抽象出来。同时提供一个方法来将控件注册为 jquery 插件。

## 开始

拉去代码后进入目录

```
# 安装控件
~ npm i

# 运行 demo
~ npm run demo
```

## 属性

### widget.prototype.$content

jquery 对象

控件的内容，也就是模板提供之后的生成的内容

在调用 render 之后可以使用

如果没有提供模板，则 $content 不存在

### widget.prototype.$container

jquery 对象

容器，也就是 container 指定的对象

在调用 initConfig 方法之后可以使用

## 方法

详见 demo

### widget.prototype.initConfig

初始化配置，调用这个方法将会读取控件初始化配置时候的用户选项和控件容器中的标签选项，标签选项的优先级高于用户配置的用户选项

#### 初始化选项和标签选项的名字的映射关系

```
dataSource.url --> data-source--url
```

例子：
```javascript
defaultOptions={
    dataSource{
        url:'',
        params:{

        }
    }
}
```

```html
<div class="js-hook" data-source--url="http://"></div>
```

#### 参数

* options 用户配置


### widget.prototype.render

对控件进行渲染，可以选择替换原来的容器，也可以选在在容器内容渲染控件

#### 参数

* replace 是否替换原来的容器

### widget.registerJQeuryPlug

将控件注册为 jquery 插件

#### 参数

* plugname 插件名
* constructor 构造函数