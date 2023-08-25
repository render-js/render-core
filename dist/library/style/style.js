// @ts-ignore
import { sessionStorageEngin_read } from "render-status/read/read";
import { loadStyle } from "../loader/loader";
export function styleResolve(tag) {
    var theme = sessionStorageEngin_read("theme");
    if (Reflect.get(window, "styleLib").get(tag.toUpperCase()).get(theme) === undefined) {
        console.log("tag:" + tag + "has no them" + theme);
    }
    else {
        loadStyle(tag, theme, Reflect.get(window, "styleLib").get(tag.toUpperCase()).get(theme));
    }
}
export function reloadStyle(theme) {
    Reflect.get(window, "styleLib").forEach(function (value, key) {
        var styles = document.getElementsByTagName("style");
        for (var i = 0; i < styles.length; i++) {
            if (styles[i].getAttribute("tag") === key) {
                var style = document.createElement('style');
                var text = document.createTextNode(value.get(theme));
                style.appendChild(text);
                style.setAttribute("tag", key.toUpperCase());
                style.setAttribute("theme", theme);
                var head = document.getElementsByTagName('head')[0];
                head.replaceChild(style, styles[i]);
            }
        }
    });
}
