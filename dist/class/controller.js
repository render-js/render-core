var Controller = /** @class */ (function () {
    //构造函数
    function Controller() {
        this.link = new Map();
        this.to = Array();
        this.raw_data = {};
    }
    //接收器
    Controller.prototype.receiver = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.proto.getMethods()[method].apply(this.proxyForMethods, args);
    };
    return Controller;
}());
export { Controller };
