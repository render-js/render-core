import system_t_3 from "./system_t_3";
import {HttpAction} from "../../prototype/HttpAction";
import {RouterGeneric} from "../../../tension/generic/router/RouterGeneric";

export function set_system_ext_router(router:RouterGeneric):void
{
    Reflect.set(system_t_3,"router", router);
}

export function get_system_ext_router():RouterGeneric
{
    return  Reflect.get(system_t_3,"router");
}

export function get_user_ext_http():HttpAction
{
    return  Reflect.get(system_t_3.user,"http");
}

export function set_user_ext_http(http:HttpAction):void
{
    Reflect.set(system_t_3.user, "http", http);
}

export function set_user_anonymous_ext(name:string, ext:any):void
{
    Reflect.set(system_t_3.user.Anonymous, name, ext);
}

export function get_user_anonymous_ext(name:string):any
{
    return Reflect.get(system_t_3.user.Anonymous, name);
}

export function set_user_anonymous_field(name:string, value:any):void
{
    Reflect.set(system_t_3.user.Anonymous, name, value);
}

export function get_user_anonymous_field(name:string):any
{
    return Reflect.get(system_t_3.user.Anonymous, name);
}