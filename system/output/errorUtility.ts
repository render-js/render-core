import LintError from "../../verify/generic/lintError";

export function errorDisplay(tag:string, error:LintError):void{
    console.log("捕获到全局错误：", error.message, "在:", tag, "的第",error.line, "行", "第", error.column, "列");
}

export function warnDisplay(error:LintError):void{
    console.warn()
}

export function infoDisplay(error:LintError):void{
    console.info()
}