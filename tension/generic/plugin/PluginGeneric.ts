import {HooksGeneric} from "./hooks/HooksGeneric";
import {PrefaceGeneric} from "./preface/PrefaceGeneric";

export interface PluginGeneric{
    plugin(preface:PrefaceGeneric, hooks:HooksGeneric):void;
}