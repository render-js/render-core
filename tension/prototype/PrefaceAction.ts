import {PrefaceGeneric} from "../generic/plugin/preface/PrefaceGeneric";
import {Component} from "../../index";
import {HttpAction} from "../../system/prototype/HttpAction";
import {registerTagLib} from "../../xboot/tagProcessor";
import {
    set_system_ext_router,
    set_user_anonymous_ext, set_user_anonymous_field,
    set_user_ext_http
} from "../../system/recorder/table3/system_func_3";
import {set_router_mode} from "../../system/recorder/table1/system_func_1";
import {RouterGeneric} from "../generic/router/RouterGeneric";

export class PrefaceAction implements PrefaceGeneric {

    add_anonymous_extension(name: string, plugin: object): void {
        set_user_anonymous_ext(name, plugin);
    }

    add_anonymous_filed(name: string, value: any): void {
        set_user_anonymous_field(name, value);
    }

    add_system_router(router: RouterGeneric): void {
        set_system_ext_router(router);
    }

    add_user_http(http: HttpAction): void {
        set_user_ext_http(http);
    }

    register_component(component: Component): void {
        registerTagLib(component);
    }

    set_field_route_mode(value: boolean): void {
        set_router_mode(value);
    }
}