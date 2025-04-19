import {AbstractPlugin, Component} from "../../../index";

export default {
    tagLib: new Map<string,Component>,
    styleLib: new Map<string, Map<string, string>>,
    extendLib: new Map<string, AbstractPlugin>,
    contextController: null,
    router: null
}