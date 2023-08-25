export function checkStyleLabel(tag) {
    //获取所有的style标签
    var styles = document.getElementsByTagName("style");
    //遍历标签，查看是否已经加载tag样式
    for (var i = 0; i < styles.length; i++) {
        if (styles[i].getAttribute("tag") === tag.toUpperCase())
            //样式已经加载
            return true;
    }
    //样式未加载
    return false;
}
export function themeStyle(component, styleLib) {
    var template = component.getTemplate();
    var dom = document.createElement("div");
    dom.innerHTML = template;
    var styles = dom.getElementsByTagName("template")[0].content.querySelectorAll("style");
    var kk = new Map();
    for (var i = 0; i < styles.length; i++) {
        kk.set(styles[i].getAttribute("theme"), styles[i].innerText);
    }
    styleLib.set(component.getName().toUpperCase(), kk);
}
