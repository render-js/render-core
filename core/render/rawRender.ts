import {Component} from "../../class/component/component";
import {ComponentController} from "../../class/component/componentController";
import {PageController} from "../../class/controller/pageController";
import {controllerCycleTypeTwo} from "../lifecycle/controllerCycle";
import {afterCmd, cmdUtility} from "../utility/cmdUtility";
import {mount, unBox} from "../lifecycle/mount";
import {injectRefs} from "../inject/inject";
import {afterMethodsTypeTwo} from "../lifecycle/afterMethods";
import { findComponent } from "./delivery";
import {resolver_solt} from "../cmd/solt/v-solt";

/**
 * 该函数用于渲染不需要记录状态的组件
 * @param proto
 * @param parent
 * @param child
 * @param link
 * @param tagTemplate
 */
export function raw_render(proto:Component, parent:ParentNode, child:Element, link:ComponentController | PageController, tagTemplate:Element):void{

    //获取控制对象
    let controller:ComponentController = new ComponentController();

    //解析solt
    resolver_solt(child,controller);

    //控制对象预处理
    controllerCycleTypeTwo(controller,proto,child,link,tagTemplate);

    //beforeRender,可以获取数据而不触发更新
    proto.getBeforeRender().call(controller.raw_data);

    //解析指令（模板处理）
    cmdUtility(tagTemplate,proto,controller);

    //mount
    mount(controller,proto,parent,child,tagTemplate);

    //获取注入引用资源
    injectRefs(controller);

    //渲染后处理
    afterCmd(controller.root,proto,controller);

    //后处理（数据渲染）
    afterMethodsTypeTwo(controller,child,link);

    //afterRender，可以操作渲染后的dom
    proto.getAfterRender().call(controller.proxyForMethods);

    //深度渲染
    findComponent(controller.root.children,controller);

    if (proto.getMode() === "insert"){
        unBox(controller.root)
    }
}