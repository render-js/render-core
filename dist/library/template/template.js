export function getTemplate(proto) {
    //生成DOM
    var temp = document.createElement("div");
    temp.innerHTML = proto.getTemplate();
    var template = temp.getElementsByTagName("template")[0];
    var content = template.content;
    //获得模板元素
    return content.firstElementChild;
}
