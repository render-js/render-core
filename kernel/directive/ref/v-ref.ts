/**
 *
 * @param el
 * @param refs
 */
export function parse_directive_refs(el:HTMLCollection, refs:Map<string, Element>):void
{
    for (let i:number = 0; i < el.length; i++)
    {
        if (el[i].hasAttribute("@ref"))
        {
            refs.set(el[i].getAttribute("@ref"),el[i]);

            el[i].removeAttribute("@ref");
        }else {
            parse_directive_refs(el[i].children,refs);
        }
    }
}