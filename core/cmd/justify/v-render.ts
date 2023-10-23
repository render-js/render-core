/**
 *
 * @param elements
 * @param data
 */
export function resolver_render(elements:HTMLCollection,data:{}):void{

    for (let i:number = 0; i < elements.length; i++){

        let result:boolean = elements[i].hasAttribute("@render")

        if (result){

            let dataName:string = elements[i].getAttribute("@render")

            elements[i].removeAttribute("@render")

            if (data[dataName] === true){
                // @ts-ignore
                elements[i].style.display = "block";

            }else if (data[dataName] === false) {
                // @ts-ignore
                elements[i].style.display = "none";

            }else {

                console.log("@render instruct should be used with boolean!");
                
            }
        }

        resolver_render(elements[i].children,data);
    }
}