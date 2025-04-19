import system_t_2 from "../recorder/table2/system_t_2";

export function isUnKnown(element:string):boolean
{
    return !system_t_2.some((ele: string): boolean => ele == element);
}