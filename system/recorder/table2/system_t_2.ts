let system_t_2:string[] = [];

let tableTag:string[] = ["FORM","INPUT","TEXTAREA","BUTTON","SELECT","OPTGROUP","OPTION","LABEL","FIELDSET","LEGEND","DATALIST","KEYGEN","OUTPUT"];
system_t_2 = system_t_2.concat(tableTag);

let frameTag:string[] = ["FRAME","FRAMESET","NOFRAMES","IFRAME"];
system_t_2 = system_t_2.concat(frameTag);

let imgTag:string[] = ["IMG","MAP","AREA","CANVAS","FIGCAPTION","FIGURE","AUDIO","VIDEO","SOURCE","TRACK"];
system_t_2 = system_t_2.concat(imgTag);

let linkTag:string[] = ["A","LINK","MAIN","NAV"];
system_t_2 = system_t_2.concat(linkTag);

let listTag:string[] = ["UL","OL","LI","DIR","DL","DT","DD","MENU","COMMAND"];
system_t_2 = system_t_2.concat(listTag);

let titleTag:string[] = ["H1","H2","H3","H4","H5","H6"];
system_t_2 = system_t_2.concat(titleTag);

let tbTag:string[] = ["TABLE","CAPTION","TH","TR","TD","THEAD","TBODY","TFOOT","COL","COLGROUP"];
system_t_2 = system_t_2.concat(tbTag);

let styleTag:string[] = ["STYLE","DIV","SPAN","HEADER","FOOTER","SECTION","ARTICLE","ASIDE","DETAILS","DIALOG","SUMMARY"];
system_t_2 = system_t_2.concat(styleTag);

let metaTag:string[] = ["HEAD","META","BASE","BASEFONT"];
system_t_2 = system_t_2.concat(metaTag);

let programTag:string[] = ["SCRIPT","NOSCRIPT","APPLET","EMBED","OBJECT","PARAM"];
system_t_2 = system_t_2.concat(programTag);

let formTag:string[] = ["ACRONYM","ABBR","ADDRESS","B","BDI","BDO","BIG","BLOCKQUOTE","CENTER","CITE","CODE","DEL","DFN","EM","FONT","I","INS","KBD","MARK","METER","PRE","PROGRESS","Q","RP","RT","RUBY","S","SAMP","SMALL","STRIKE","STRONG","SUB","SUP","TIME","TT","U","VAR","WBR"];
system_t_2 = system_t_2.concat(formTag);

let baseTag:string[] = ["!DOCTYPE","HTML","TITLE","BODY","P","BR","HR","!--...--"];
system_t_2 = system_t_2.concat(baseTag);

export default system_t_2;