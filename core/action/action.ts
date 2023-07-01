import {Controller} from "../../class/controller";

let metaTag:string[] = ["H1","H2","H3","H4","H5","H6","DIV","SCRIPT","A","UL","LI","OL","TABLE","TH","TD","LABEL","INPUT","FORM","LABEL","SELECT","OPTION"];

export function isUnKnown(element:string):boolean
{
    return !metaTag.some((ele: string): boolean => ele == element);
}

export function addRef(el:HTMLCollection):Map<string, Element>
{
    let ref:Map<string, Element> = new Map<string, Element>();

    for (let i:number = 0; i < el.length; i++)
    {
        if (el[i].hasAttribute("ref"))
        {
            ref.set(el[i].getAttribute("ref"),el[i]);
        }
    }
    return  ref;
}