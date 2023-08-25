import { bindModelForUpdater } from "../utility/miscUtility";
import { findComponent } from "./initRender";
import { getTemplate } from "../../library/template/template";
import { cmdForUpdate } from "../../library/cmd/cmd";
export function updateRender(controller) {
    //生成DOM
    var tagTemplate = getTemplate(controller.proto);
    //清除保存的发布对象
    controller.to = [];
    //beforeRender
    var beforeRender = controller.proto.getBeforeRender().bind(controller.raw_data);
    beforeRender();
    //解析指令
    cmdForUpdate(tagTemplate, controller.proto, controller);
    //beforeUnmount
    var beforeUnmount = controller.proto.getBeforeUnmount().bind(controller.raw_data);
    beforeUnmount();
    //unmount
    while (controller.root.hasChildNodes()) {
        controller.root.removeChild(controller.root.firstChild);
    }
    //beforeMount
    var beforeMount = controller.proto.getBeforeMount().bind(controller.raw_data);
    beforeMount();
    //mount
    while (tagTemplate.hasChildNodes()) {
        controller.root.appendChild(tagTemplate.firstChild);
    }
    //afterRender
    var afterRender = controller.proto.getAfterRender().bind(controller.raw_data);
    afterRender();
    //获取定位
    bindModelForUpdater(controller.root.children, controller.proxyForMethods);
    //深度渲染
    findComponent(controller.root.children, controller);
}
