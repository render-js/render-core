import {HttpAction} from "../../../../system/prototype/HttpAction";
import {Component} from "../../../../index";
import {RouterGeneric} from "../../router/RouterGeneric";

export interface PrefaceGeneric {

    add_system_router(router:RouterGeneric):void

    add_user_http(http:HttpAction):void;

    add_anonymous_extension(name:string, plugin:object):void;

    add_anonymous_filed(name:string, value:any):void;

    register_component(component:Component):void;

    set_field_route_mode(value:boolean):void;
}