import {ComponentController} from "../../proto/controller/ComponentController";
import {afterCmd, cmdUtility,} from "../utility/cmdUtility";
import {injectRefs} from "../inject/inject";
import {findComponent} from "./delivery";
import {getTemplate} from "../utility/templateUtility";

/**
 * 更新渲染方法
 * @param controller
 */
export function update_Render(controller:ComponentController):void{

    //生成DOM
    let tagTemplate:Element = getTemplate(controller.prototypeOfComponent)

    //清除保存的发布对象
    controller.slaveComponent = [];

    //解析指令
    cmdUtility(tagTemplate,controller.prototypeOfComponent,controller);

    //unmount
    while (controller.componentAttachedRootElement.hasChildNodes()){
        controller.componentAttachedRootElement.removeChild(controller.componentAttachedRootElement.firstChild);
    }

    //mount
    while (tagTemplate.hasChildNodes()){
        controller.componentAttachedRootElement.appendChild(tagTemplate.firstChild);
    }

    injectRefs(controller);

    //渲染后处理
    afterCmd(controller.componentAttachedRootElement, controller.prototypeOfComponent, controller);

    //深度渲染
    findComponent(controller.componentAttachedRootElement.children,controller);
}