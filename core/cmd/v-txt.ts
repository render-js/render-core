export function resolver_txt(elements:HTMLCollection,data:any):void{

    for (let i:number = 0; i < elements.length; i++){

        let result:boolean = elements[i].hasAttribute("v-txt")

        if (result){

            let dataName:string = elements[i].getAttribute("v-txt")

            elements[i].removeAttribute("v-txt")

            // @ts-ignore
            try {
                elements[i].innerHTML = data[dataName]();
            }catch (e) {
                elements[i].innerHTML = data[dataName];
            }
        }

        resolver_txt(elements[i].children,data);
    }
}