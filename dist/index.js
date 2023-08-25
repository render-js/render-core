import { Component } from "./class/component";
import meta from "./meta/meta";
import { reloadPage, renderHtml } from "./runtime/runtime";
import { themeStyle } from "./core/utility/styleUtility";
// @ts-ignore
import { redirect } from "render-security/utility/redirect";
import { PageController } from "./class/pageController";
import { App } from "./meta/app";
//页面RenderJs
var RenderJS = /** @class */ (function () {
    //构造函数
    function RenderJS() {
        this.tagLib = new Map();
        this.page = new PageController();
        this.config = {};
        Reflect.set(this.config, "version", meta.version);
        Reflect.set(this.config, "theme", meta.style);
    }
    //添加路由器
    RenderJS.prototype.addRouter = function (router) {
        this.routerC = router;
    };
    //添加自定义标签
    RenderJS.prototype.addTag = function (component) {
        var _this = this;
        if (component instanceof Component) {
            if (!this.tagLib.has(component.getName().toUpperCase())) {
                this.tagLib.set(component.getName().toUpperCase(), component);
            }
            else {
                console.warn("The Tag:" + component.getName().toUpperCase() + "has been registered!");
            }
        }
        else {
            component.forEach(function (component) {
                if (!_this.tagLib.has(component.getName().toUpperCase())) {
                    _this.tagLib.set(component.getName().toUpperCase(), component);
                }
                else {
                    console.warn("The Tag:" + component.getName().toUpperCase() + "has been registered!");
                }
            });
        }
    };
    //运行renderJs
    RenderJS.prototype.run = function () {
        if (this.routerC) {
            this.routerC.data.beforeRouter();
            if (typeof this.routerC.getRule(location.href) === "boolean") {
                this.render();
            }
            else {
                if (this.routerC.getRule(location.href).beforeRouter()) {
                    this.render();
                }
                else {
                    redirect("/http/400.html");
                }
            }
            this.routerC.data.afterRouter();
        }
        else {
            this.render();
        }
    };
    RenderJS.prototype.render = function () {
        //保存全局tagLib对象
        Reflect.set(window, "tagLib", this.tagLib);
        //获取styleLib对象
        var styleLib = new Map();
        this.tagLib.forEach(function (component) {
            themeStyle(component, styleLib);
        });
        Reflect.set(window, "styleLib", styleLib);
        Reflect.set(window, "context", new App());
        Reflect.set(window, "router", this.routerC);
        //开始渲染
        renderHtml(document.body.children, this.page);
        window.onload = reloadPage.bind(this);
    };
    return RenderJS;
}());
export { RenderJS };
