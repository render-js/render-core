import {Component} from "../../../index";

export default {
    tagLib: new Map<string,Component>,
    styleLib: new Map<string, Map<string, string>>,
    contextController: null
}