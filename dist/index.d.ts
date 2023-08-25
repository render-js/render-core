import { Component } from "./class/component";
import { routerController } from "render-security/class/Router";
export declare class RenderJS {
    readonly config: {};
    readonly tagLib: Map<string, Component>;
    private routerC;
    private readonly page;
    constructor();
    addRouter(router: routerController): void;
    addTag(component: Component | Component[]): void;
    run(): void;
    private render;
}
