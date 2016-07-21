/**
 * 一个说话程序
 * @module sayer
 * @author xjc
 */

var extend = require('extend');
var Widget = require('../widget.js');
var util = require('util');

jQuery(function($){
    // 构造器
    var Main = function() {

    }

    // 继承Widget插件
    util.inherits(Main, Widget);

    // 定义插件选项以及默认值
    Main.prototype.defaultOptions = {
        name:''
    };

    // 初始化
    Main.prototype.init = function(options) {
        var self = this;
        // 初始化配置
        self.initConfig(options, true);
        // 渲染模板 参数 replace=true 代表替换原来的容器
        self.render(true);
        // 注册事件
        self.initEvent();
    };

    // 模板
    Main.prototype.template = function() {
        var self = this;
        return '<div>'+self.name+' : <input type="text" placeholder="说点啥"/> <button>say</button></div>';
    };

    // 定义方法
    Main.prototype.say = function(name, words) {
        alert(name+':'+words);
    }

    // 注册事件
    Main.prototype.initEvent = function(){
        var self = this;
        self.$content.find('button').on('click', function(){
            var name = self.name;
            var words = self.$content.find('input').val();
            self.say(name, words);
        });
    }

    /**
     * 使用提供的方法注册为 jquery 插件
     */
    Widget.registerJQeuryPlug('sayer', Main);

});

