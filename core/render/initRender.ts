import {Component} from "../../class/component/component";
import {Controller} from "../../class/controller/controller";
import {ApiController} from "../../class/controller/apiController";
import {PageController} from "../../class/controller/pageController";
import {controllerCycleTypeOne} from "../../library/lifecycle/controllerCycle";
import {afterCmd, cmd} from "../../library/cmd/cmd";
import {mount} from "../../library/lifecycle/mount";
import {injectRefs} from "../inject/inject";
import {afterMethodsTypeOne} from "../../library/lifecycle/afterMethods";
import {findComponent} from "./delivery";
import {resolver_solt} from "../cmd/v-solt";

/**
 * 该函数用于处理需要更更新时候，需要从父组件提取数据状态的渲染操作
 * @param proto
 * @param parent
 * @param child
 * @param link
 * @param tagTemplate
 */
export function init_render(proto:Component, parent:ParentNode, child:Element, link:Controller | ApiController | PageController, tagTemplate:Element):void{

    //获取控制对象
    let controller:Controller = new Controller();

    //解析solt
    resolver_solt(child,controller);

    //控制对象预处理
    controllerCycleTypeOne(controller,proto,child,link,tagTemplate);

    //beforeRender
    let beforeRender = proto.getBeforeRender().bind(controller.raw_data);
    beforeRender();

    //内存中数据渲染
    cmd(tagTemplate,proto,controller);

    //beforeMount
    let beforeMount = proto.getBeforeMount().bind(controller.raw_data);
    beforeMount();

    //mount
    mount(controller,proto,parent,child,tagTemplate);

    //获取
    injectRefs(controller,tagTemplate);

    //渲染后处理
    afterCmd(controller.root,proto,controller);

    //afterRender
    let afterRender = proto.getAfterRender().bind(controller.proxyForMethods);
    afterRender();

    //后处理
    afterMethodsTypeOne(controller,child,link);

    //深度渲染
    findComponent(tagTemplate.children,controller);
}