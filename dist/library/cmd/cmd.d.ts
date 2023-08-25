import { Component } from "../../class/component";
import { Controller } from "../../class/controller";
import { ApiController } from "../../class/apiController";
import ApiComponent from "../../class/apiComponent";
export declare function cmd(tagTemplate: Element, proto: Component | ApiComponent, controller: Controller | ApiController): void;
export declare function cmdForUpdate(tagTemplate: Element, proto: Component, controller: Controller | ApiController): void;
