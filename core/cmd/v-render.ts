export function resolver_render(elements:HTMLCollection,data:{}):void{

    for (let i:number = 0; i < elements.length; i++){

        let result:boolean = elements[i].hasAttribute("v-render")

        if (result){

            let dataName:string = elements[i].getAttribute("v-render")

            elements[i].removeAttribute("v-render")

            if (data[dataName] instanceof Boolean){
                if (data[dataName] === true){
                    // @ts-ignore
                    elements[i].style.display = "block";
                }else {
                    // @ts-ignore
                    elements[i].style.display = "none";
                }
            }
        }

        let subElements:HTMLCollection = elements[i].children

        resolver_render(subElements,data)
    }
}