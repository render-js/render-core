import { Controller } from "../../class/controller";
import { Component } from "../../class/component";
import { ApiController } from "../../class/apiController";
import { PageController } from "../../class/pageController";
export declare function Render(proto: Component, parent: ParentNode, child: Element, link: Controller | ApiController | PageController): void;
export declare function findComponent(collection: HTMLCollection, link: Controller | ApiController | PageController): void;
