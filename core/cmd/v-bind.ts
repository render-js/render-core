export function resolver_bind(nodes:HTMLCollection,data:{}):void
{

    for (let i:number=0;i<nodes.length;i++){

        let attributes:string[] = nodes[i].getAttributeNames()

        for (let j:number=0;j<attributes.length;j++){

            let result:RegExpMatchArray = attributes[j].match(/^v-bind:([a-z]+)$/g)

            if (result === null){

            }else {

                for (let k:number=0;k<result.length;k++){

                    let property:string = result[k].substring(7)

                    let dataName:string = nodes[i].getAttribute(result[k])

                    nodes[i].removeAttribute(result[k])

                    try {
                        nodes[i].setAttribute(property,JSON.stringify(data[dataName]));
                    }catch (e) {
                        nodes[i].setAttribute(property,data[dataName]);
                    }
                }
            }
        }

        let subElements:HTMLCollection = nodes[i].children

        resolver_bind(subElements,data);
    }
}