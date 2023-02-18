import {resolveRoute} from "../resolver/resolver";

export function loadPage(){

    let page:string = resolveRoute(this.router,location.pathname)

    let xml:XMLHttpRequest = new XMLHttpRequest()

    xml.onreadystatechange = function (){

        if(xml.readyState === 4 && xml.status === 200){

            eval(xml.responseText)
        }
    }

    xml.open("GET","/assert/render/"+page+".js")

    xml.send()
}