import axios from "axios";

function loadStyle(url:string):void {
    let link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = url
    let head = document.getElementsByTagName('head')[0];
    head.appendChild(link)
}


export function loadPage():void{
    let page;
    switch(location.pathname){
        case "/": page = "one";break
        case "/one": page = "one";break
        case "/two": page = "two";break
        default: page = "404";break
    }
    axios.get("/assert/page/"+page+".js")
        .then(function(res: { data: string; }){
            eval(res.data)
        })
}