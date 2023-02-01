var Page = /** @class */ (function () {
    function Page(page) {
        this.name = page.name;
        this.template = page.template;
        this.components = page.components;
        this.beforeRender = page.beforeRender;
        this.afterRender = page.afterRender;
    }
    Page.prototype.getMethods = function () {
        return this.methods;
    };
    Page.prototype.getComponents = function () {
        return this.components;
    };
    Page.prototype.getBeforeRender = function () {
        return this.beforeRender;
    };
    Page.prototype.getAfterRender = function () {
        return this.afterRender;
    };
    Page.prototype.getName = function () {
        return this.name;
    };
    Page.prototype.getTemplate = function () {
        return this.template;
    };
    return Page;
}());
export function renderPage(partial) {
    var component = new Page(partial);
    component.hash = "2222";
    return component;
}
