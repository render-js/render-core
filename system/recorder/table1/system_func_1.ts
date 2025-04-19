import system_t_1 from "./system_t_1";

export function get_theme_style():string
{
    return Reflect.get(system_t_1,"styleTheme")
}

export function set_theme_style(style:string):void
{
    Reflect.set(system_t_1,"styleTheme",style)
}