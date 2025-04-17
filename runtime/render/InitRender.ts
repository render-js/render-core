import {ComponentController} from "../../proto/controller/ComponentController";
import {PageController} from "../../proto/controller/PageController";
import {controllerCycleTypeOne} from "../lifecycle/controllerCycle";
import {afterCmd, cmdUtility} from "../utility/cmdUtility";
import {mount, unBox} from "../lifecycle/mount";
import {injectRefs} from "../inject/inject";
import {afterMethodsTypeOne} from "../lifecycle/afterMethods";
import {findComponent} from "./delivery";
import {resolver_solt} from "../cmd/solt/v-solt";
import {Component} from "render-refer";

/**
 * 该函数用于处理需要更更新时候，需要从父组件提取数据状态的渲染操作
 * @param proto
 * @param parent
 * @param child
 * @param link
 * @param tagTemplate
 */
export function init_render(proto:Component, parent:ParentNode, child:Element, link:ComponentController | PageController, tagTemplate:Element):void{

    //获取控制对象
    let controller:ComponentController = new ComponentController();

    //解析solt
    resolver_solt(child,controller);

    //控制对象预处理
    controllerCycleTypeOne(controller,proto,child,link,tagTemplate);

    //内存中模板处理
    cmdUtility(tagTemplate,proto,controller);

    //mount
    mount(controller,proto,parent,child,tagTemplate);

    //获取
    injectRefs(controller);

    //渲染后数据处理
    afterCmd(controller.componentAttachedRootElement,proto,controller);

    //后处理
    afterMethodsTypeOne(controller,child,link);

    //深度渲染
    findComponent(tagTemplate.children,controller);

    if (proto.getConfig()["mode"] === false){
        unBox(controller.componentAttachedRootElement)
    }
}