export interface HooksGeneric{

    //更改标签样式
    changeStyle(tag:string, theme:string):void;

    //更改主题样式
    changeTheme(theme:string):void;

    //无参数跳转
    relocate(position:string):void;

    //有参数跳转
    redirect(url:string,parameters:{}):void;
}