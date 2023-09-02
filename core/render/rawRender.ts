import {Component} from "../../class/component/component";
import {Controller} from "../../class/controller/controller";
import {ApiController} from "../../class/controller/apiController";
import {PageController} from "../../class/controller/pageController";
import {controllerCycleTypeTwo} from "../../library/lifecycle/controllerCycle";
import {afterCmd, cmd} from "../../library/cmd/cmd";
import {mount} from "../../library/lifecycle/mount";
import {injectRefs} from "../inject/inject";
import {afterMethodsTypeTwo} from "../../library/lifecycle/afterMethods";
import { findComponent } from "./delivery";

/**
 * 该函数用于渲染不需要记录状态的组件
 * @param proto
 * @param parent
 * @param child
 * @param link
 * @param tagTemplate
 */
export function raw_render(proto:Component, parent:ParentNode, child:Element, link:Controller | ApiController | PageController, tagTemplate:Element):void{
    //获取控制对象
    let controller:Controller = new Controller();

    //控制对象预处理
    controllerCycleTypeTwo(controller,proto,child,link,tagTemplate);

    //beforeRender
    let beforeRender = proto.getBeforeRender().bind(controller.raw_data);
    beforeRender();

    //解析指令
    cmd(tagTemplate,proto,controller);

    //beforeMount
    let beforeMount = proto.getBeforeMount().bind(controller.raw_data);
    beforeMount();

    //mount
    mount(controller,proto,parent,child,tagTemplate);

    injectRefs(controller,tagTemplate);

    //渲染后处理
    afterCmd(controller.root,proto,controller);

    //afterRender
    let afterRender = proto.getAfterRender().bind(controller.raw_data);
    afterRender();

    //后处理
    afterMethodsTypeTwo(controller,child,link);

    //深度渲染
    findComponent(controller.root.children,controller);
}