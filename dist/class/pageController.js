var PageController = /** @class */ (function () {
    //构造函数
    function PageController() {
        //注入系统方法
        this.methods = Reflect.get(window, "pageMethods");
        this.link = new Map();
        this.to = Array();
        this.crtTag = null;
    }
    //接收器
    PageController.prototype.receiver = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    };
    Object.defineProperty(PageController.prototype, "crtTag", {
        get: function () {
            return this.currentTag;
        },
        set: function (element) {
            this.currentTag = element;
        },
        enumerable: false,
        configurable: true
    });
    return PageController;
}());
export { PageController };
