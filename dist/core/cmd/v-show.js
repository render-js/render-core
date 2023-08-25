export function resolver_show(elements, data) {
    for (var i = 0; i < elements.length; i++) {
        var result = elements[i].hasAttribute("v-show");
        if (result) {
            var dataName = elements[i].getAttribute("v-show");
            elements[i].removeAttribute("v-show");
            if (data[dataName] instanceof Boolean) {
                if (data[dataName] === true) {
                    // @ts-ignore
                    elements[i].style.visibility = true;
                }
                else {
                    // @ts-ignore
                    elements[i].style.visibility = false;
                }
            }
        }
        var subElements = elements[i].children;
        resolver_show(subElements, data);
    }
}
