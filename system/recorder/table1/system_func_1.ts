import system_t_1 from "./system_t_1";

export function get_theme_style():string
{
    return Reflect.get(system_t_1,"styleTheme")
}

export function set_theme_style(style:string):void
{
    Reflect.set(system_t_1,"styleTheme",style)
}

export function set_router_mode(value:boolean):void
{
    Reflect.set(system_t_1,"routerMode",value);
}

export function get_route_mode():boolean
{
    return Reflect.get(system_t_1,"routeMode");
}

export function set_path_variable(value:object):void
{
    Reflect.set(system_t_1,"pathVariable",value);
}

export function get_path_variable():Map<string, string>
{
    return Reflect.get(system_t_1,"pathVariable");
}

export function get_route_table():object
{
    return Reflect.get(system_t_1,"routeTable");
}

export function set_route_table(value:object):void
{
    Reflect.set(system_t_1,"routeTable",value);
}