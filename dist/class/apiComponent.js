var ApiComponent = /** @class */ (function () {
    function ApiComponent(config) {
        //标签名称
        this.name = config.name;
        //标签模板样式
        this.template = config.template;
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
    ApiComponent.prototype.getName = function () {
        return this.name;
    };
    ApiComponent.prototype.getTemplate = function () {
        return this.template;
    };
    ApiComponent.prototype.getData = function () {
        return this.data;
    };
    ApiComponent.prototype.getMethods = function () {
        return this.methods;
    };
    ApiComponent.prototype.getComputed = function () {
        return this.computed;
    };
    ApiComponent.prototype.getWatcher = function () {
        return this.watcher;
    };
    ApiComponent.prototype.getBeforeRender = function () {
        return this.beforeRender;
    };
    ApiComponent.prototype.getAfterRender = function () {
        return this.afterRender;
    };
    ApiComponent.prototype.getBeforeUpdate = function () {
        return this.beforeUpdate;
    };
    ApiComponent.prototype.getAfterUpdate = function () {
        return this.afterUpdate;
    };
    ApiComponent.prototype.getBeforeMount = function () {
        return this.beforeMount;
    };
    ApiComponent.prototype.getBeforeUnmount = function () {
        return this.beforeUnmount;
    };
    return ApiComponent;
}());
export default ApiComponent;
