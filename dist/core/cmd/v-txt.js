export function resolver_txt(elements, data) {
    for (var i = 0; i < elements.length; i++) {
        var result = elements[i].hasAttribute("v-txt");
        if (result) {
            var dataName = elements[i].getAttribute("v-txt");
            elements[i].removeAttribute("v-txt");
            // @ts-ignore
            elements[i].innerText = data[dataName];
        }
        var subElements = elements[i].children;
        resolver_txt(subElements, data);
    }
}
