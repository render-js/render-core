import {ContextController} from "../prototype/ContextController";

export function textType(target:any,doc:any,controller:ContextController):void{
    // @ts-ignore
    target.value = controller.dataForMethod[target.getAttribute("name")];

    // @ts-ignore
    target.focus();

    // @ts-ignore
    target.setSelectionRange(doc.start, doc.start);
}

export function assignType(target:any,controller:ContextController):void{
    // @ts-ignore
    target.value = controller.dataForMethod[target.getAttribute("name")];
}

export function fileType(target:any,controller:ContextController):void{
    // @ts-ignore
    target.files = controller.dataForMethod[target.getAttribute("name")];
}

export function checkType(target:any):void{
    // @ts-ignore
    target.checked = "checked";
}