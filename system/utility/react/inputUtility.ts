export function inputUtility(element:Element, space:Object):void{
    switch (element.getAttribute("type")){
        case "text":editType(element,space);break;
        case "color":assignType(element,space);break;
        case "date":assignType(element,space);break;
        case "time":assignType(element,space);break;
        case "email":editType(element,space);break;
        case "url":editType(element,space);break;
        case "week":assignType(element,space);break;
        case "tel":editType(element,space);break;
        case "search":editType(element,space);break;
        case "range":assignType(element,space);break;
        case "radio":assignType(element,space);break;
        case "password":editType(element,space);break;
        case "number":editType(element,space);break;
        case "month":assignType(element,space);break;
        case "hidden":editType(element,space);break;
        case "file":filesType(element,space);break;
        case "datetime-local":assignType(element,space);break;
        case "datetime":assignType(element,space);break;
        case "checkbox":assignType(element,space);break;
        default:console.log("This type input can`t be dealed!");break
    }
}

function assignType(element:Element, space:Object):void{
    Reflect.set(space,"origin",{
        tag:element.tagName,
        id:element.getAttribute("id"),
    })
}

function editType(element:Element, space:Object):void{
    Reflect.set(space,"origin",{
        tag:element.tagName,
        id:element.getAttribute("id"),
        // @ts-ignore
        start:element.selectionStart
    })
}

export function filesType(element:Element, space:Object):void{

    Reflect.set(space,"origin",{
        tag: element.tagName,
        id:element.getAttribute("id")
    });
}

export function selectUtility(element:Element, space:Object):void{

    Reflect.set(space,"origin",{
        tag: element.tagName,
        id:element.getAttribute("id"),
        // @ts-ignore
        selected:element.value
    });
}

export function textareaUtility(element:Element, space:Object):void{

    Reflect.set(space,"origin",{
        tag: element.tagName,
        id:element.getAttribute("id"),
        // @ts-ignore
        start:element.selectionStart
    });
}

export function changeUtility(element:Element, space:Object):void{

    Reflect.set(space,"origin",{
        tag: element.tagName,
        id:element.getAttribute("id"),
        // @ts-ignore
        start:element.selectionStart
    });
}