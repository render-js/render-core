var Component = /** @class */ (function () {
    function Component(config) {
        //标签名称
        this.name = config.name;
        //标签模板样式
        this.template = config.template;
        //添加数据
        if (typeof config.props == "undefined") {
            this.props = [];
        }
        else {
            this.props = config.props;
        }
        //添加数据
        if (typeof config.data == "undefined") {
            this.data = {};
        }
        else {
            this.data = config.data;
        }
        //添加计算属性
        if (config.computed == "undefined") {
            this.computed = {};
        }
        else {
            this.computed = config.computed;
        }
        //添加方法属性
        if (typeof config.methods == "undefined") {
            this.methods = {};
        }
        else {
            this.methods = config.methods;
        }
        //添加监控属性
        if (typeof config.watcher == "undefined") {
            this.watcher = {};
        }
        else {
            this.watcher = config.watcher;
        }
        //生命周期函数
        if (typeof config.beforeRender == "undefined") {
            this.beforeRender = function () { };
        }
        else {
            this.beforeRender = config.beforeRender;
        }
        if (typeof config.afterRender == "undefined") {
            this.afterRender = function () { };
        }
        else {
            this.afterRender = config.afterRender;
        }
        if (typeof config.beforeUpdate == "undefined") {
            this.beforeUpdate = function () { };
        }
        else {
            this.beforeUpdate = config.beforeUpdate;
        }
        if (typeof config.afterUpdate == "undefined") {
            this.afterUpdate = function () { };
        }
        else {
            this.afterUpdate = config.afterUpdate;
        }
        if (typeof config.beforeMount == "undefined") {
            this.beforeMount = function () { };
        }
        else {
            this.beforeMount = config.beforeMount;
        }
        if (typeof config.beforeUnmount == "undefined") {
            this.beforeUnmount = function () { };
        }
        else {
            this.beforeUnmount = config.beforeUnmount;
        }
    }
    Component.prototype.getName = function () {
        return this.name;
    };
    Component.prototype.getTemplate = function () {
        return this.template;
    };
    Component.prototype.getProps = function () {
        return this.props;
    };
    Component.prototype.getData = function () {
        return this.data;
    };
    Component.prototype.getMethods = function () {
        return this.methods;
    };
    Component.prototype.getComputed = function () {
        return this.computed;
    };
    Component.prototype.getWatcher = function () {
        return this.watcher;
    };
    Component.prototype.getBeforeRender = function () {
        return this.beforeRender;
    };
    Component.prototype.getAfterRender = function () {
        return this.afterRender;
    };
    Component.prototype.getBeforeUpdate = function () {
        return this.beforeUpdate;
    };
    Component.prototype.getAfterUpdate = function () {
        return this.afterUpdate;
    };
    Component.prototype.getBeforeMount = function () {
        return this.beforeMount;
    };
    Component.prototype.getBeforeUnmount = function () {
        return this.beforeUnmount;
    };
    return Component;
}());
export { Component };
