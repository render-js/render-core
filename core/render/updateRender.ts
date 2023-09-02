import {Controller} from "../../class/controller/controller";
import {bindModelForUpdater} from "../utility/miscUtility";
import {afterCmd, cmdForUpdate} from "../../library/cmd/cmd";
import {injectRefs} from "../inject/inject";
import {findComponent} from "./delivery";
import {getTemplate} from "../utility/templateUtility";

/**
 * 更新渲染方法
 * @param controller
 */
export function update_Render(controller:Controller):void{

    //生成DOM
    let tagTemplate:Element = getTemplate(controller.proto)

    //清除保存的发布对象
    controller.to = [];

    //beforeRender
    let beforeRender = controller.proto.getBeforeRender().bind(controller.raw_data);
    beforeRender();

    //解析指令
    cmdForUpdate(tagTemplate,controller.proto,controller);

    //beforeUnmount
    let beforeUnmount = controller.proto.getBeforeUnmount().bind(controller.raw_data);
    beforeUnmount();

    //unmount
    while (controller.root.hasChildNodes()){
        controller.root.removeChild(controller.root.firstChild);
    }

    //beforeMount
    let beforeMount = controller.proto.getBeforeMount().bind(controller.raw_data);
    beforeMount();

    //mount
    while (tagTemplate.hasChildNodes()){
        controller.root.appendChild(tagTemplate.firstChild);
    }

    injectRefs(controller,tagTemplate);

    //渲染后处理
    afterCmd(controller.root, controller.proto, controller);

    //afterRender
    let afterRender = controller.proto.getAfterRender().bind(controller.raw_data);
    afterRender();

    //获取定位
    bindModelForUpdater(controller.root.children,controller.proxyForMethods);

    //深度渲染
    findComponent(controller.root.children,controller);
}