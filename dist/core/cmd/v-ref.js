export function resolver_Refs(el, refs) {
    for (var i = 0; i < el.length; i++) {
        if (el[i].hasAttribute("ref")) {
            refs.set(el[i].getAttribute("ref"), el[i]);
        }
        else {
            resolver_Refs(el[i].children, refs);
        }
    }
}
