/**
 * 控件的抽象类，写控件的时候可以继承此类来减少操作
 * @module widget
 * @author xjc
 */

/* 引入依赖 */
var util = require('@plug/util');

function Widget() {

}

Widget.prototype.defaultOptions = {

};

/**
 * 初始化配置
 * @param  {Object} options 用户选项
 */
Widget.prototype.initConfig = function(options, deep) {
    var self = this;
    // 获取初始化时候的配置
    var halfOptions;
    if (deep) {
        halfOptions = util.extend(true, {}, self.defaultOptions, options);
    } else {
        halfOptions = util.extend({}, self.defaultOptions, options);
    }
    // 获取标签上的 Options
    util.traverseLeafWithPath(self.defaultOptions, function(value, path) {
        // 标签上的选项的名字
        var tagOptionName = self.getTagOptionNameBy(path);
        // 标签上选项的值
        var tagOptionValue = $(halfOptions.container).attr(tagOptionName);
        // 如果标签 value 值不为空，则覆盖当前的选项
        if (!util.isEmpty(tagOptionValue)) {
            util.visit(halfOptions, path, tagOptionValue);
        }
    });
    // 最终合体
    util.extend(self, halfOptions);

    // 获取容器
    self.$container = $(self.container).eq(0);
};

/**
 * 通过 option name 获取 tag 上的 option name
 *     两者的格式不同，映射关系如下，
 *         dataSource.utl ---> data-source--util
 * @param  {[type]} optionName [description]
 * @return {[type]}            [description]
 */
Widget.prototype.getTagOptionNameBy = function(optionName) {
    var tagOptionName = optionName;
    return tagOptionName
        .replace(/\./g, '--')
        .replace(/([A-Z])/g, function($$, $1) {
            return '-' + $1.toLowerCase();
        });
}

/**
 * 根据模板对控件进行渲染
 *     要求存在 template 方法
 * @param  {Boolean} replace 是否替换控件容器元素
 */
Widget.prototype.render = function(replace) {
    var self = this;
    // 获取模板
    var template = '';
    if (typeof self.template === 'function') {
        template = self.template();
    }
    if (typeof self.template === 'string') {
        template = self.template;
    }
    // 如果模板为空，则停止渲染，并且抛出错误
    if (typeof template !== 'string') {
        throw new Error('type of template is not string!');
        return;
    }
    if (template === '') {
        return;
    }
    // 生成 dom
    self.$content = $(template);

    // 是否替换元素
    if (replace) {
        // 替换控件容器
        // 如果模板中的最外层元素大于1,则报错
        if (self.$content.length > 1) {
            throw new Error('if replace, template content element can not more then one!')
            return;
        }
        // 偷梁换柱
        self.$container.hide();
        self.$container.after(self.$content);
    } else {
        // 不替换元素
        // 直接将内容插入到容器中
        self.$container
            .empty()
            .append(self.$content);
    }
};


/**
 * 绑定事件
 * @param  {String} eventname  事件的名称
 * @param  {Function} handle     事件的处理函数
 */
Widget.prototype.on = function(eventname, handle) {
    var self = this;
    // 将事件绑定在容器上
    $(self.container).on(eventname, handle);
}

/**
 * 注册为 jquery 插件
 * @param  {String} plugname     插件的名字
 * @param  {Function} constructor  插件的构造函数
 */
Widget.registerJQeuryPlug = function(plugname, constructor) {
    // 将类暴露到 jQuery 变量下便于扩展
    jQuery[plugname] = constructor;

    $.fn[plugname] = function(options) {
        if (options === undefined) {
            // 如果存在句柄，则返回
            return this;
        }

        // 在 Options 存在的情况下,初始化控件，并返回自己，以供链式调用，并且保存 handle
        return this.each(function() {
            var $this = $(this);

            // 实例化控件
            var someWidget = new constructor();
            // 初始化控件
            options.container = $this;
            someWidget.init(options);
            // 保存句柄
            $this.data('handle-' + plugname, someWidget);
        });
    };

    $.fn.handle = function() {
        var self = this;
        // handle 对象
        var handle = {};
        // 获取组件中的方法，添加到新的 handle 对象中
        for (var key in constructor.prototype) {
            if (util.isFunction(constructor.prototype[key])) {
                (function(methodName) {
                    handle[methodName] = function() {
                        var outArguments = arguments;
                        self.each(function() {
                            var onehandle = $(this).data('handle-' + plugname);
                            onehandle[methodName].apply(onehandle, outArguments);
                        });
                    }
                })(key);
            }
        }
        return handle;
    }
};

/**
 * 初始化所有的 jquery 插件
 * @return {[type]} [description]
 */
Widget.initJQueryPlug = function(){
    $('[widget]').each(function(){
        var $this = $(this);
        var widgetName = $this.attr('widget');
        $this[widgetName]({});
    });
};

/**
 * 导出插件
 */
module.exports = Widget;

// 对传统模块化方法的支持
/* @support tradition plugname(widget) */
