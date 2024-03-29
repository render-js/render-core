/**
 *
 * @param el
 * @param refs
 */
export function resolver_Refs(el:HTMLCollection, refs:Map<string, Element>):void
{
    for (let i:number = 0; i < el.length; i++)
    {
        if (el[i].hasAttribute("@ref"))
        {
            refs.set(el[i].getAttribute("@ref"),el[i]);

            el[i].removeAttribute("@ref");
        }else {
            resolver_Refs(el[i].children,refs);
        }
    }
}