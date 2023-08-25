export function resolver_html(elements, data) {
    for (var i = 0; i < elements.length; i++) {
        var result = elements[i].hasAttribute("v-html");
        if (result) {
            var dataName = elements[i].getAttribute("v-html");
            elements[i].removeAttribute("v-html");
            // @ts-ignore
            elements[i].innerHTML = data[dataName];
        }
        var subElements = elements[i].children;
        resolver_html(subElements, data);
    }
}
