import { Controller } from "../../class/controller";
import { Component } from "../../class/component";
import { ApiController } from "../../class/apiController";
import { PageController } from "../../class/pageController";
export declare function init_render(proto: Component, parent: ParentNode, child: Element, link: Controller | ApiController | PageController, tagTemplate: Element): void;
export declare function post_render(proto: Component, parent: ParentNode, child: Element, link: Controller | ApiController | PageController, tagTemplate: Element): void;
export declare function raw_render(proto: Component, parent: ParentNode, child: Element, link: Controller | ApiController | PageController, tagTemplate: Element): void;
