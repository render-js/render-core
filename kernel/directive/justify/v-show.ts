/**
 *
 * @param elements
 * @param data
 */
export function parse_directive_show(elements:HTMLCollection,data:{}):void
{

    for (let i:number = 0; i < elements.length; i++){

        let result:boolean = elements[i].hasAttribute("@show")

        if (result){

            let dataName:string = elements[i].getAttribute("@show")

            elements[i].removeAttribute("@show")

            if (data[dataName] === true){
                // @ts-ignore
                elements[i].style.visibility = "visible";
            }else if (data[dataName] === false) {
                // @ts-ignore
                elements[i].style.visibility = "hidden";
            }
            else {
                console.log("@show instruct should be used with boolean!");
            }
        }

        parse_directive_show(elements[i].children,data);
    }
}