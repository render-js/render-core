export function resolver_show(elements:HTMLCollection,data:{}):void{

    for (let i:number = 0; i < elements.length; i++){

        let result:boolean = elements[i].hasAttribute("v-show")

        if (result){

            let dataName:string = elements[i].getAttribute("v-show")

            elements[i].removeAttribute("v-show")

            if (data[dataName] instanceof Boolean){
                if (data[dataName] === true){
                    // @ts-ignore
                    elements[i].style.visibility = true;
                }else {
                    // @ts-ignore
                    elements[i].style.visibility = false;
                }
            }
        }

        let subElements:HTMLCollection = elements[i].children

        resolver_show(subElements,data)
    }
}