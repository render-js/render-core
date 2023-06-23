let metaTag:string[] = ["H1","H2","H3","H4","H5","H6","DIV","SCRIPT","A","UL","LI","OL","TABLE","TH","TD","LABEL","INPUT"];

export function isUnKnown(element:string):boolean
{
    if (metaTag.some(ele => ele == element)){
        return false;
    }return false
}