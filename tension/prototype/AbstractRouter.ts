import {RouterGeneric} from "../generic/RouterGeneric";
import {Component} from "../../index";

export class AbstractRouter implements RouterGeneric{

    public getComponentByUrl(url: string): Component {
        return undefined;
    }

    public getQueriesByUrl(url: string): Map<string, any> {
        return undefined;
    }

}