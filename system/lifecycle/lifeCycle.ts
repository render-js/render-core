import {ContextController} from "../prototype/ContextController";

/**
 * 该函数用于处理渲染后操作
 * @param currenController
 * @param child
 * @param parentController
 */
export function after_process_for_init(currenController:ContextController, child:ChildNode , parentController:ContextController):void
{

    /* save currentController to parentController's publishing array */
    parentController.slaveComponent.push(currenController)
    // @ts-ignore
    parentController.lazyComponent.set(child.getAttribute("name"), controller.originalData);
}

/**
 * 该函数用于处理渲染后操作
 * @param currentController
 * @param parentController
 */
export function after_process_for_post(currentController:ContextController, parentController:ContextController):void
{
    /* save currentController to parentController's publishing array */
    parentController.slaveComponent.push(currentController)
}