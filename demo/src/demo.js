var Widget = require('../../widget.js');
var util = require('@plug/util');

var SomeWidget = function() {

}

util.inherits(SomeWidget, Widget);

SomeWidget.prototype = new Widget();



SomeWidget.prototype.defaultOptions = {
    name: '',
    value: '',
    age: '100',
    dataSource:{
        url:'this is url default'
    }
};

SomeWidget.prototype.init = function(options) {
    var self = this;
    self.initConfig(options);
    self.render(true);

    setTimeout(function(){
        $(self.container).trigger('bobe', self.name);
    }, 1000);
};

SomeWidget.prototype.template = function() {
    var self = this;
    return '<div><span class="btn">' + self.name + '   ' + self.value + '  '+ self.age + ' ' + self.dataSource.url +'</span></div>';
};

// 使用控件

/**
 * 直接单例初始化
 */
// var w = new SomeWidget();
// w.init({
//     container:'.js-hook',
//     name:'this is name',
//     value:'value is here'
// });

/**
 * 手动注册为 jquery plug
 */
// $.fn.SomeWidget = function(options) {
//     if (options === undefined) {
//         // 如果存在句柄，则返回
//         return $(this).data('handle');
//     }
//     // 在 Options 存在的情况下,初始化控件，并返回自己，以供链式调用，并且保存 handle
//     return this.each(function() {
//         var $this = $(this);

//         // 实例化控件
//         var someWidget = new SomeWidget();
//         // 初始化控件
//         options.container = $this;
//         someWidget.init(options);
//         // 保存句柄
//         $this.data('handle', someWidget);
//     });
// }

/**
 * 使用提供的方法注册为 jquery 插件
 */
Widget.registerJQeuryPlug('bbb', SomeWidget);

/**
 * 对控件类进行扩展
 */
$.extend($.bbb.prototype.defaultOptions, {age:0});

/**
 * 初始化控件
 */
$('.js-hook').bbb({
    container:'.js-hook',
    name:'this is name',
    value:'value is here'
});

/**
 * 监听事件
 */
$('.js-hook').bbb().on('bobe', function(e, arg1){
    console.log('爆炸了 '+arg1);
})

$('.js-hook.x2').bbb().on('bobe', function(e, arg1){
    console.log('爆炸了 '+arg1);
})

/**
 * 获取控件的句柄
 */
console.log($('.js-hook.x1').bbb());
/**
 * 获取控件的另一个句柄
 */
console.log($('.js-hook.x2').bbb());