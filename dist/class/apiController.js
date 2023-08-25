var ApiController = /** @class */ (function () {
    function ApiController() {
        this.link = new Map();
        this.preRender = false;
    }
    //接收器
    ApiController.prototype.receiver = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.proto.getMethods()[method].apply(this.proxyForMethods, args);
    };
    return ApiController;
}());
export { ApiController };
