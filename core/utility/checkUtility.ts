import metaTagLib from "../../runtime/metaTagLib";

export function isUnKnown(element:string):boolean
{
    return !metaTagLib.some((ele: string): boolean => ele == element);
}