import {getProxyForInject} from "../proxy/getProxy";

export function resolver_Ref(el:HTMLCollection):Map<string, Element>
{
    let ref:Map<string, Element> = new Map<string, Element>();

    for (let i:number = 0; i < el.length; i++)
    {
        if (el[i].hasAttribute("ref"))
        {
            ref.set(el[i].getAttribute("ref"),el[i]);
        }
    }
    return  getProxyForInject(ref);
}