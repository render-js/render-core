import {HooksGeneric} from "./HooksGeneric";
import {PrefaceGeneric} from "./PrefaceGeneric";

export interface PluginGeneric{
    plugin(preface:PrefaceGeneric, hooks:HooksGeneric):void;
}