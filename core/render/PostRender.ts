import {Component} from "../../class/component/component";
import {ComponentController} from "../../class/component/componentController";
import {PageController} from "../../class/controller/pageController";
import {controllerCycleTypeTwo} from "../lifecycle/controllerCycle";
import {afterCmd, cmdUtility} from "../utility/cmdUtility";
import {mount, unBox} from "../lifecycle/mount";
import {injectRefs} from "../inject/inject";
import {afterMethodsTypeOne} from "../lifecycle/afterMethods";
import {findComponent} from "./delivery";
import {resolver_solt} from "../cmd/solt/v-solt";

/**
 * 该函数用于初次渲染需要记录状态的组件
 * @param proto
 * @param parent
 * @param child
 * @param link
 * @param tagTemplate
 */
export function post_render(proto:Component, parent:ParentNode, child:Element, link:ComponentController | PageController, tagTemplate:Element):void{

    //获取控制对象
    let controller:ComponentController = new ComponentController();

    //解析solt
    resolver_solt(child,controller);

    //控制对象预处理
    controllerCycleTypeTwo(controller,proto,child,link,tagTemplate);

    //beforeRender
    proto.getBeforeRender().call(controller.raw_data);

    //解析指令
    cmdUtility(tagTemplate,proto,controller);

    //mount
    mount(controller,proto,parent,child,tagTemplate);

    injectRefs(controller);

    //渲染后处理
    afterCmd(controller.root, controller.proto, controller);

    //后处理
    afterMethodsTypeOne(controller,child,link);

    //afterRender
    proto.getAfterRender().call(controller.proxyForMethods);

    //深度渲染
    findComponent(controller.root.children,controller);

    if (proto.getMode() === "insert"){
        unBox(controller.root)
    }
}