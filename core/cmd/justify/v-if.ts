/**
 *
 * @param elements
 * @param data
 */
export function resolver_if(elements:HTMLCollection, data:{}):void{

    let tag:boolean = false;

    //在当前级别下寻找到v-if
    for (let i:number = 0; i < elements.length; i++){

        let result:boolean = elements[i].hasAttribute("v-if")

        if (result){

            let dataName:string = elements[i].getAttribute("v-if")

            elements[i].removeAttribute("v-if")

            if (data[dataName] === true){
                // @ts-ignore
                break;

            }else if (data[dataName] === false) {
                // @ts-ignore
                elements[i].style.display = "none";
                tag = true;
                break;
            }
            else {
                console.log("v-if instruction should be used with boolean!");
                return;
            }
        }

        resolver_if(elements[i].children, data);
    }

    //v-if渲染失败，寻找到是否匹配的v-else
    for (let j:number = 0; j < elements.length; j++){

        let result:boolean = elements[j].hasAttribute("v-else")

        if (result){

            elements[j].removeAttribute("v-else")

            if (tag){
                // @ts-ignore
                elements[j].style.display = "none";
                return;
            }
        }
    }
}