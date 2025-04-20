import {ContextController} from "../../prototype/ContextController";

/**
 * This func used to resolve input-data which is the text type
 * @param target
 * @param doc
 * @param controller
 */
export function textType(target:any,doc:any,controller:ContextController):void
{
    // @ts-ignore
    target.value = controller.dataForMethod[target.getAttribute("name")];
    // @ts-ignore
    target.focus();
    // @ts-ignore
    target.setSelectionRange(doc.start, doc.start);
}

/**
 * This func used to resolve input-data which is the assign type
 * @param target
 * @param controller
 */
export function assignType(target:any,controller:ContextController):void
{
    // @ts-ignore
    target.value = controller.dataForMethod[target.getAttribute("name")];
}

/**
 * This func used to resolve input-data which is the file type
 * @param target
 * @param controller
 */
export function fileType(target:any,controller:ContextController):void
{
    // @ts-ignore
    target.files = controller.dataForMethod[target.getAttribute("name")];
}

/**
 * This func used to resolve input-data which is the check type
 * @param target
 */
export function checkType(target:any):void
{
    // @ts-ignore
    target.checked = "checked";
}