import {Component} from "../../index";

export interface RouterGeneric{

    getComponentByUrl(url: string): Component;

    getQueriesByUrl(url: string): Map<string, any>
}