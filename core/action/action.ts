let metaTag:string[] = ["H1","H2","H3","H4","H5","H6","DIV","SCRIPT","A","UL","LI","OL","TABLE","TH","TD","LABEL","INPUT","FORM","LABEL","SELECT","OPTION"];

export function isUnKnown(element:string):boolean
{
    return !metaTag.some((ele: string): boolean => ele == element);
}