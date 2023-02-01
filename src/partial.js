var Partial = /** @class */ (function () {
    function Partial(partial) {
        this.name = partial.name;
        this.template = partial.template;
        this.components = partial.components;
        this.beforeRender = partial.beforeRender;
        this.afterRender = partial.afterRender;
    }
    Partial.prototype.getMethods = function () {
        return this.methods;
    };
    Partial.prototype.getComponents = function () {
        return this.components;
    };
    Partial.prototype.getBeforeRender = function () {
        return this.beforeRender;
    };
    Partial.prototype.getAfterRender = function () {
        return this.afterRender;
    };
    Partial.prototype.getName = function () {
        return this.name;
    };
    Partial.prototype.getTemplate = function () {
        return this.template;
    };
    return Partial;
}());
export function definePartial(partial) {
    var component = new Partial(partial);
    component.hash = "2222";
    return component;
}
