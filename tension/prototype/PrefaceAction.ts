import {PrefaceGeneric} from "../generic/PrefaceGeneric";
import {AbstractRouter} from "./AbstractRouter";
import {AbstractPlugin} from "../../index";
import {set_router_for_application} from "../../system/recorder/table0/system_func_0";
import {HooksAction} from "./HooksAction";

export class PrefaceAction implements PrefaceGeneric {

    set_router(router: AbstractRouter): void {
        set_router_for_application(router);
    }

    use_plugin(plugin: AbstractPlugin): void {
        plugin.plugin(new PrefaceAction(), new HooksAction());
    }
}