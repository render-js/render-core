/**
 *
 * @param elements
 * @param data
 */
export function resolver_show(elements:HTMLCollection,data:{}):void{

    for (let i:number = 0; i < elements.length; i++){

        let result:boolean = elements[i].hasAttribute("v-show")

        if (result){

            let dataName:string = elements[i].getAttribute("v-show")

            elements[i].removeAttribute("v-show")

            if (data[dataName] === true){
                // @ts-ignore
                elements[i].style.visibility = "visible";
            }else if (data[dataName] === false) {
                // @ts-ignore
                elements[i].style.visibility = "hidden";
            }
            else {
                console.log("v-show instruct should be used with boolean!");
            }
        }

        resolver_show(elements[i].children,data);
    }
}