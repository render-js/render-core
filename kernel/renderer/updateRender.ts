import {
    directive_parse_collection_for_after,
    directive_parse_collection_for_before,
} from "../../system/utility/directive/cmdUtility";
import {inject_$refs_to_data} from "../../system/injection/injector";
import {findComponent} from "../delivery/delivery";
import {getTemplate} from "../../system/utility/initiate/templateUtility";
import {archive_mount, mountForUpdate} from "../../system/lifecycle/mount";
import {ContextController} from "../../system/prototype/ContextController";

/**
 * 更新渲染方法
 * @param currentController
 */
export function update_Render(currentController:ContextController):void{
    
    let tagTemplate:Element = getTemplate(currentController.prototypeOfComponent);
        currentController.slaveComponent = Array();

    inject_$refs_to_data(tagTemplate, currentController.originalData);

    //解析指令
    directive_parse_collection_for_before(tagTemplate,currentController.prototypeOfComponent,currentController);

    //mount
    if (!currentController.componentConfig.boxMode){
        let renderSpace:Element = mountForUpdate(tagTemplate);
        while (currentController.anchorBegin.nextSibling !== currentController.anchorEnd)
            currentController.componentAttachedRootElement.removeChild(currentController.anchorBegin.nextSibling)
        while (renderSpace.hasChildNodes())
            currentController.componentAttachedRootElement.insertBefore(renderSpace.firstChild, currentController.anchorEnd);
        while (renderSpace.hasChildNodes())
            currentController.componentAttachedRootElement.insertBefore(renderSpace.firstChild,currentController.anchorEnd);
    }
    else {
        // @ts-ignore
        archive_mount(currentController, currentController.prototypeOfComponent, currentController.componentAttachedRootElement.parentNode, currentController.componentAttachedRootElement ,tagTemplate);
    }

    //渲染后处理
    directive_parse_collection_for_after(currentController.componentAttachedRootElement, currentController);

    //深度渲染
    findComponent(currentController.componentAttachedRootElement.children,currentController);
}