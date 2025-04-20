import {PrefaceGeneric} from "./generic/plugin/preface/PrefaceGeneric";
import {HooksGeneric} from "./generic/plugin/hooks/HooksGeneric";
import {PluginGeneric} from "./generic/plugin/PluginGeneric";
import {HttpAction} from "../system/prototype/HttpAction";

export class SystemInitPlugin implements PluginGeneric{

    plugin(preface: PrefaceGeneric, hooks: HooksGeneric) {
        preface.add_user_http(new HttpAction());
    }
}