/**
 * [description]
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
Widget.prototype.initConfig = function(options) {
    var self = this;
    // 获取初始化时候的配置
    util.extend(self, self.defaultOptions, options);
    // 获取容器
    self.$container = $(self.container).eq(0);
    // 获取钩子上的配置
    for (var key in self.defaultOptions) {
        // 内联配置的值
        var value = self.$container.attr(key);
        // 如果 value 不为空
        if (!util.isEmpty(value)) {
            // 添加到选项中
            self[key] = value;
        }
    }

};

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
        throw new Error('can not find template!');
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
        // 将容器元素中的id 和 class 复制到 内容元素中
        // var id = self.$container.attr('id');
        // var className = self.$container.attr('class');
        // self.$content
        //     .attr('id',id)
        //     .addClass(className);
        // 替换容器元素为内容元素
        // self.$container.replaceWith(self.$content);
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
 * 注册为 jquery 插件
 * @param  {String} plugname     插件的名字
 * @param  {Function} constructor  插件的构造函数
 */
Widget.registerJQeuryPlug = function(plugname, constructor) { 

    $.fn[plugname] = function(options) {
        if (options === undefined) {
            // 如果存在句柄，则返回
            return $(this).data('handle');
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
            $this.data('handle', someWidget);
        });
    }
};

/**
 * 导出插件
 */
module.exports = Widget;

// 对传统模块化方法的支持
/* @support tradition plugname(widget) */
