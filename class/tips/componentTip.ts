export interface RenderBase{
    getName():string;
    getTemplate():string;
    getMode():string;
    getBoxStyle(): string;
    getProps(): {};
    getData():{};
    getComputed():{};
    getMethods():{};
    getWatcher():{};
    getBeforeRender():()=>void
    getAfterRender():()=>void
}