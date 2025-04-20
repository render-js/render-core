import system_t_2 from "./system_t_2";

/**
 * This func used the check the tag
 * @param element
 */
export function tag_unknown_check(element:string):boolean
{
    return !system_t_2.some((ele: string): boolean => ele == element);
}