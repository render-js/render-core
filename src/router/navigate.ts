export  var navigate = {
    forward(){
        history.forward();
    },
    back() {
        history.back();
    },
    go(uri:string){
        location.href = uri;
    }
}