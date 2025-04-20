import {Component} from "../../../index";

export interface RouterGeneric{

    getComponent(): Component;

    getPathVariable(): Map<string, any>
}