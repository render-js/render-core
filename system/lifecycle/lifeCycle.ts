import {ContextController} from "../prototype/ContextController";

/**
 * This function handles pre-render operations
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
 * This function handles post-render operations
 * @param currentController
 * @param parentController
 */
export function after_process_for_post(currentController:ContextController, parentController:ContextController):void
{
    /* save currentController to parentController's publishing array */
    parentController.slaveComponent.push(currentController)
}