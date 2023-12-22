import {inputUtility, selectUtility, textareaUtility} from "./inputUtility";

/**
 *
 * @param evt
 */
export function compositionstart(evt){
    evt.target.setAttribute("flag","false")
}

/**
 *
 * @param evt
 */
export function listener(evt){
    if (!evt.target.hasAttribute("flag")){

        //Get the event element
        let element = evt.target

        switch (element.nodeName.toUpperCase()){
            case "INPUT": inputUtility(element,this);break;
            case "SELECT":selectUtility(element,this);break;
            case "TEXTAREA":textareaUtility(element,this);break;
            default:console.error("Can`t bind this type input tag!");break
        }

        //Update the value
        if (element.type === "file"){
            this[element.name] = element.files;
        }else{
            this[element.name] = element.value;
        }
    }
}

/**
 *
 * @param evt
 */
export  function compositionend (evt){
    evt.target.setAttribute("flag","true")
    //Get the event element
    let element = evt.target

    //Get the name attribute
    let dataName = element.name

    switch (element.nodeName.toUpperCase()){
        case "INPUT": inputUtility(element,this);break;
        case "SELECT":selectUtility(element,this);break;
        case "TEXTAREA":textareaUtility(element,this);break;
        default:console.error("Can`t bind this type input tag!");break
    }

    //Update the value
    this[dataName] = element.value;
}