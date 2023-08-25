import metaTagLib from "../../runtime/database/metaTagLib";

export function isUnKnown(element:string):boolean
{
    return !metaTagLib.some((ele: string): boolean => ele == element);
}