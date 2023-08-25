import { Controller } from "./controller";
export declare class PageController {
    private methods;
    private currentTag;
    to: Controller[];
    link: Map<string, {}>;
    constructor();
    receiver(method: string, ...args: any[]): void;
    set crtTag(element: Element);
    get crtTag(): Element;
}
