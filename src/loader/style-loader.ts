/*
 *Here is the loader for style
 */

export function loadStyle(data) {
    let style = document.createElement('style')
    let text = document.createTextNode(data)
    style.appendChild(text)
    let head = document.getElementsByTagName('head')[0];
    head.appendChild(style)
}