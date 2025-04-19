import {ContextController} from "../define/ContextController";
import {assignType, checkType, fileType, textType} from "./inputType";

/**
 *
 * @param controller
 */
export function locateInputAddress(controller:ContextController):void{

    //判断是否是输入导致的数据更新
    if (controller.dataForMethod.hasOwnProperty("origin")){

        let doc:any = Reflect.get(controller.dataForMethod,"origin");

        let target:HTMLElement = document.getElementById(doc.id)

        switch (doc.tag){
            case "INPUT":locateInput(target,doc,controller);break;
            case "SELECT":locateSelect(target,doc);break;
            case "TEXTAREA":locateTextArea(target,doc,controller);break;
            default: console.log("Can't locate input address");break;
        }
    }
}

function locateInput(target:any,doc:any,controller:ContextController):void{
    switch (target.getAttribute("type")){
        case "text":textType(target,doc,controller);break;
        case "color":assignType(target,controller);break;
        case "date":assignType(target,controller);break;
        case "time":assignType(target,controller);break;
        case "email":textType(target,doc,controller);break;
        case "url":textType(target,doc,controller);break;
        case "week":assignType(target,controller);break;
        case "tel":textType(target,doc,controller);break;
        case "search":textType(target,doc,controller);break;
        case "range":assignType(target,controller);break;
        case "radio":checkType(target);break;
        case "password":textType(target,doc,controller);break;
        case "number":textType(target,doc,controller);break;
        case "month":assignType(target,controller);break;
        case "hidden":assignType(target,controller);break;
        case "file":fileType(target,controller);break;
        case "datetime-local":assignType(target,controller);break;
        case "datetime":assignType(target,controller);break;
        case "checkbox":assignType(target,controller);break;
        default:console.log("This type input can`t be tackled!");break
    }
}

function locateTextArea(target:any, doc:any, controller:ContextController):void{
    // @ts-ignore
    target.value = controller.dataForMethod[target.getAttribute("name")];

    // @ts-ignore
    target.focus();

    // @ts-ignore
    target.setSelectionRange(doc.start, doc.start);
}

function locateSelect(target:any, doc:any):void{
    // @ts-ignore
    let list = target.getElementsByTagName("option")

    for (let i =0; i<list.length;i++){

        if (list[i].value === doc.selected){

            list[i].selected = true;
        }
    }
}