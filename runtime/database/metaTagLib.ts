let metaTagLib:string[] = [];

let tableTag:string[] = ["FORM","INPUT","TEXTAREA","BUTTON","SELECT","OPTGROUP","OPTION","LABEL","FIELDSET","LEGEND","DATALIST","KEYGEN","OUTPUT"];
metaTagLib = metaTagLib.concat(tableTag);

let frameTag:string[] = ["FRAME","FRAMESET","NOFRAMES","IFRAME"];
metaTagLib = metaTagLib.concat(frameTag);

let imgTag:string[] = ["IMG","MAP","AREA","CANVAS","FIGCAPTION","FIGURE","AUDIO","VIDEO","SOURCE","TRACK"];
metaTagLib = metaTagLib.concat(imgTag);

let linkTag:string[] = ["A","LINK","MAIN","NAV"];
metaTagLib = metaTagLib.concat(linkTag);

let listTag:string[] = ["UL","OL","LI","DIR","DL","DT","DD","MENU","COMMAND"];
metaTagLib = metaTagLib.concat(listTag);

let titleTag:string[] = ["H1","H2","H3","H4","H5","H6"];
metaTagLib = metaTagLib.concat(titleTag);

let tbTag:string[] = ["TABLE","CAPTION","TH","TR","TD","THEAD","TBODY","TFOOT","COL","COLGROUP"];
metaTagLib = metaTagLib.concat(tbTag);

let styleTag:string[] = ["STYLE","DIV","SPAN","HEADER","FOOTER","SECTION","ARTICLE","ASIDE","DETAILS","DIALOG","SUMMARY"];
metaTagLib = metaTagLib.concat(styleTag);

let metaTag:string[] = ["HEAD","META","BASE","BASEFONT"];
metaTagLib = metaTagLib.concat(metaTag);

let programTag:string[] = ["SCRIPT","NOSCRIPT","APPLET","EMBED","OBJECT","PARAM"];
metaTagLib = metaTagLib.concat(programTag);

let formTag:string[] = ["ACRONYM","ABBR","ADDRESS","B","BDI","BDO","BIG","BLOCKQUOTE","CENTER","CITE","CODE","DEL","DFN","EM","FONT","I","INS","KBD","MARK","METER","PRE","PROGRESS","Q","RP","RT","RUBY","S","SAMP","SMALL","STRIKE","STRONG","SUB","SUP","TIME","TT","U","VAR","WBR"];
metaTagLib = metaTagLib.concat(formTag);

let baseTag:string[] = ["!DOCTYPE","HTML","TITLE","BODY","P","BR","HR","!--...--"];
metaTagLib = metaTagLib.concat(baseTag);

//返回数组
export default metaTagLib;