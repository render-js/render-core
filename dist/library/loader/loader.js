import { checkStyleLabel } from "../../core/utility/styleUtility";
export function loadStyle(tag, theme, styleData) {
    if (!checkStyleLabel(tag)) {
        var style = document.createElement('style');
        var text = document.createTextNode(styleData);
        style.appendChild(text);
        style.setAttribute("tag", tag.toUpperCase());
        style.setAttribute("theme", theme);
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
    }
}
