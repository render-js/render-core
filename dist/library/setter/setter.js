import { updateRender } from "../../core/render/updateRender";
export function getSetter(data, updater) {
    var setter = function (obj, prop, value) {
        obj[prop] = value;
        updateRender(this);
        return true;
    };
    return setter.bind(updater);
}
export function getSetterForInject(data) {
    return function (obj, prop, value) {
        console.error("Meta filed can't be set value!");
        return false;
    };
}
export function getSetterForApi(data, updater) {
    var setter = function (obj, prop, value) {
        obj[prop] = value;
        updateRender(this);
        return true;
    };
    return setter.bind(updater);
}
