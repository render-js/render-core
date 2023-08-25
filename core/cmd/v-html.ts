export function resolver_html(elements:HTMLCollection,data:{}):void{

    for (let i:number = 0; i < elements.length;i++){

        let result:boolean = elements[i].hasAttribute("v-html")

        if (result){

            let dataName:string = elements[i].getAttribute("v-html")

            elements[i].removeAttribute("v-html")

            // @ts-ignore
            elements[i].innerHTML = data[dataName]
        }

        let subElements:HTMLCollection = elements[i].children

        resolver_html(subElements,data)
    }
}