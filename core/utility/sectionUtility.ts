import {ComponentController} from "../../class/component/componentController";
import {assignType, checkType, fileType, textType} from "./inputType";

/**
 *
 * @param controller
 */
export function locateInputAddress(controller:ComponentController):void{

    //判断是否是输入导致的数据更新
    if (controller.proxyForMethods.hasOwnProperty("origin")){

        let doc = Reflect.get(controller.proxyForMethods,"origin");

        let target:HTMLElement = document.getElementById(doc.id)

        switch (doc.tag){
            case "INPUT":locateInput(target,doc,controller);break;
            case "SELECT":locateSelect(target,doc);break;
            case "TEXTAREA":locateTextArea(target,doc,controller);break
        }
    }
}

function locateInput(target:any,doc:any,controller:ComponentController):void{
    switch (target.getAttribute("type")){
        case "text":textType(target,doc,controller);break;
        case "color":assignType(target,doc,controller);break;
        case "date":assignType(target,doc,controller);break;
        case "time":assignType(target,doc,controller);break;
        case "email":textType(target,doc,controller);break;
        case "url":textType(target,doc,controller);break;
        case "week":assignType(target,doc,controller);break;
        case "tel":textType(target,doc,controller);break;
        case "search":textType(target,doc,controller);break;
        case "range":assignType(target,doc,controller);break;
        case "radio":checkType(target);break;
        case "password":textType(target,doc,controller);break;
        case "number":textType(target,doc,controller);break;
        case "month":assignType(target,doc,controller);break;
        case "hidden":assignType(target,doc,controller);break;
        case "file":fileType(target,doc,controller);break;
        case "datetime-local":assignType(target,doc,controller);break;
        case "datetime":assignType(target,doc,controller);break;
        case "checkbox":assignType(target,doc,controller);break;
        default:console.log("This type input can`t be dealed!");break
    }
}

function locateTextArea(target:any,doc:any, controller:ComponentController):void{
    // @ts-ignore
    target.value = controller.proxyForMethods[target.getAttribute("name")];

    // @ts-ignore
    target.focus();

    // @ts-ignore
    target.setSelectionRange(doc.start, doc.start);
}

function locateSelect(target:any,doc:any):void{
    // @ts-ignore
    let list = target.getElementsByTagName("option")
    for (let i =0; i<list.length;i++){
        if (list[i].value === doc.selected){
            list[i].selected = true;
        }
    }
}