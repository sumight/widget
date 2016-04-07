var Widget = require('../../widget.js');
var util = require('@plug/util');

// bbb 插件
(function() {
    var SomeWidget = function() {

    }
    util.inherits(SomeWidget, Widget);

    SomeWidget.prototype.defaultOptions = {
        name: '',
        value: '',
        age: '100',
        dataSource: {
            url: 'this is url default'
        }
    };

    SomeWidget.prototype.init = function(options) {
        var self = this;
        self.initConfig(options, true);
        self.render(true);

        setTimeout(function() {
            $(self.container).trigger('bobe', self.name);
        }, 1000);
    };

    SomeWidget.prototype.template = function() {
        var self = this;
        return '<div><span class="btn">' + self.name + '   ' + self.value + '  ' + self.age + ' ' + self.dataSource.url + '</span></div>';
    };

    SomeWidget.prototype.printName = function() {
        console.log('name', this.name);
    }

    /**
     * 使用提供的方法注册为 jquery 插件
     */
    Widget.registerJQeuryPlug('bbb', SomeWidget);

})();

// xxx 插件
(function() {
    var SomeWidget = function() {

    }
    util.inherits(SomeWidget, Widget);

    SomeWidget.prototype.defaultOptions = {
        validate: 'a good validate'
    };

    SomeWidget.prototype.init = function(options) {
        var self = this;
        self.initConfig(options, true);
        console.log('初始化xxx');
    };

    SomeWidget.prototype.printValidate = function() {
        console.log('validate', this.validate);
    }

    /**
     * 使用提供的方法注册为 jquery 插件
     */
    Widget.registerJQeuryPlug('xxx', SomeWidget);

})();

/**
 * 对控件类进行扩展
 */
// $.extend($.bbb.prototype.defaultOptions, { age: 0 });

/**
 * 初始化控件
 */
// $('.js-hook').bbb({
//     container: '.js-hook',
//     name: 'this is name',
//     value: 'value is here 1111'
// });
// $('.js-hook').bbb().handle().printName();

/**
 * 获取控件的句柄
 */
// console.log($('.js-hook.x1').handle().bbb());

/**
 * 获取控件的另一个句柄
 */
// console.log($('.js-hook.x2').handle().bbb());


Widget.initJQueryPlug();

$('.container').children().bbb().printName();

$('.container').children().xxx().printValidate();