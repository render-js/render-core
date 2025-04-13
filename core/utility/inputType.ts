import {ComponentController} from "../../proto/controller/ComponentController";

export function textType(target:any,doc:any,controller:ComponentController):void{
    // @ts-ignore
    target.value = controller.proxyForMethods[target.getAttribute("name")];

    // @ts-ignore
    target.focus();

    // @ts-ignore
    target.setSelectionRange(doc.start, doc.start);
}

export function assignType(target:any,doc:any,controller:ComponentController):void{
    // @ts-ignore
    target.value = controller.proxyForMethods[target.getAttribute("name")];
}

export function fileType(target:any,doc:any,controller:ComponentController):void{
    // @ts-ignore
    target.files = controller.proxyForMethods[target.getAttribute("name")];
}

export function checkType(target:any):void{
    // @ts-ignore
    target.checked = "checked";
}