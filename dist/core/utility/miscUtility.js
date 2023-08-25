export function addLabel(nodes, component) {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].setAttribute("cpn", component);
        var kk = nodes[i].children;
        addLabel(kk, component);
    }
}
export function bindModelForUpdater(nodes, data) {
    for (var i = 0; i < nodes.length; i++) {
        var result = nodes[i].hasAttribute("v-model");
        if (result) {
            var dataName = nodes[i].getAttribute("v-model");
            nodes[i].removeAttribute("v-model");
            var tagName = nodes[i].tagName;
            nodes[i].setAttribute("name", dataName);
            // @ts-ignore
            nodes[i].setAttribute("value", data[dataName]);
            if (tagName === "INPUT" || tagName === "SELECT" || tagName === "TEXTAREA") {
                nodes[i].setAttribute("name", dataName);
                // @ts-ignore
                nodes[i].setAttribute("value", data[dataName]);
                //光标定位
                var listener = function (evt) {
                    if (!evt.target.hasAttribute("flag")) {
                        var element = evt.target;
                        var dataName_1 = element.name;
                        this[dataName_1] = element.value;
                    }
                };
                var compositionstart = function (evt) {
                    evt.target.setAttribute("flag", "false");
                };
                var compositionend = function (evt) {
                    evt.target.setAttribute("flag", "true");
                    var element = evt.target;
                    var dataName = element.name;
                    this[dataName] = element.value;
                };
                nodes[i].addEventListener("input", listener.bind(data));
                nodes[i].addEventListener("compositionstart", compositionstart);
                nodes[i].addEventListener("compositionend", compositionend.bind(data));
                // @ts-ignore
                nodes[i].focus();
                // @ts-ignore
                nodes[i].setSelectionRange(data[dataName].length, data[dataName].length);
            }
        }
        var subElements = nodes[i].children;
        bindModelForUpdater(subElements, data);
    }
}
