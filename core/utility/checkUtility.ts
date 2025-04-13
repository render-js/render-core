import metaTagLib from "../../library/taglib/metaTagLib";

export function isUnKnown(element:string):boolean
{
    return !metaTagLib.some((ele: string): boolean => ele == element);
}