import {ComponentController} from "../../class/controller/componentController";
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
    let tagTemplate:Element = getTemplate(controller.proto)

    //清除保存的发布对象
    controller.to = [];

    //解析指令
    cmdUtility(tagTemplate,controller.proto,controller);

    //unmount
    while (controller.root.hasChildNodes()){
        controller.root.removeChild(controller.root.firstChild);
    }

    //mount
    while (tagTemplate.hasChildNodes()){
        controller.root.appendChild(tagTemplate.firstChild);
    }

    injectRefs(controller);

    //渲染后处理
    afterCmd(controller.root, controller.proto, controller);

    //深度渲染
    findComponent(controller.root.children,controller);
}