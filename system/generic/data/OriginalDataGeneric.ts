export interface OriginalDataGeneric{
    $name?:string;
    $props?:Map<string,any>,
    $params?:Map<string,any>,
    $refs?:Map<string,any>,
    $redirect?:(url:string,parameters:{})=>void;
    $relocate?:(position:string)=>void;
    $commit?:(method:string, ...args:[any])=>void;
    $publish?:(method:string, ...args:[any])=>void;
    $get?: (name:string) => any;
    $set?: (name:string, value: any) => any;
    $context?:{
        getVersion():string;
        getDestination():string;
        changeStyle?:(tag:string, theme:string)=>void;
        changeTheme?:(theme:string)=>void;
    }
}