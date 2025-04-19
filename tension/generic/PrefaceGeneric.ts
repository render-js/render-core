import {AbstractPlugin} from "../../index";
import {AbstractRouter} from "../prototype/AbstractRouter";

export interface PrefaceGeneric {

    use_plugin(plugin:AbstractPlugin):void;

    set_router(router:AbstractRouter):void;
}