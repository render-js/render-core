export function resolver_render(elements, data) {
    for (var i = 0; i < elements.length; i++) {
        var result = elements[i].hasAttribute("v-render");
        if (result) {
            var dataName = elements[i].getAttribute("v-render");
            elements[i].removeAttribute("v-render");
            if (data[dataName] instanceof Boolean) {
                if (data[dataName] === true) {
                    // @ts-ignore
                    elements[i].style.display = "block";
                }
                else {
                    // @ts-ignore
                    elements[i].style.display = "none";
                }
            }
        }
        var subElements = elements[i].children;
        resolver_render(subElements, data);
    }
}
