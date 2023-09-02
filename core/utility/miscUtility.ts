/**
 * 给组件元素添加cpn标签
 * @param nodes
 * @param component
 */
export function addLabel(nodes:HTMLCollection,component:string):void
{
    for (let i:number=0;i<nodes.length;i++){

        nodes[i].setAttribute("cpn",component);

        let kk:HTMLCollection = nodes[i].children

        addLabel(kk,component)
    }
}

export function bindModelForUpdater(nodes:HTMLCollection,data:{}):void
{
    for (let i:number = 0; i<nodes.length; i++){

        let result:boolean = nodes[i].hasAttribute("v-model")

        if (result){

            let dataName:string = nodes[i].getAttribute("v-model")

            nodes[i].removeAttribute("v-model")

            let tagName = nodes[i].tagName

            nodes[i].setAttribute("name",dataName)

            // @ts-ignore
            nodes[i].setAttribute("value",data[dataName])

            if (tagName === "INPUT" || tagName === "SELECT" || tagName === "TEXTAREA"){

                nodes[i].setAttribute("name",dataName)

                // @ts-ignore
                nodes[i].setAttribute("value",data[dataName])
                //光标定位

                let listener = function (evt){
                    if (!evt.target.hasAttribute("flag")){
                        let element = evt.target
                        let dataName = element.name
                        this[dataName] = element.value
                    }
                }

                let compositionstart = function (evt):void{
                    evt.target.setAttribute("flag","false")
                }

                let compositionend = function (evt):void{
                    evt.target.setAttribute("flag","true")
                    let element = evt.target
                    let dataName = element.name
                    this[dataName] = element.value
                }

                nodes[i].addEventListener("input",listener.bind(data))
                nodes[i].addEventListener("compositionstart",compositionstart)
                nodes[i].addEventListener("compositionend",compositionend.bind(data))

                // @ts-ignore
                nodes[i].focus()
                // @ts-ignore
                nodes[i].setSelectionRange(data[dataName].length, data[dataName].length)
            }
        }

        let subElements:HTMLCollection = nodes[i].children

        bindModelForUpdater(subElements,data)
    }
}








