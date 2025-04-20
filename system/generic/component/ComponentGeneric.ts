export interface ComponentGeneric{
        getName():string;
        getTemplate():string;
        getConfig():{};
        getBoxStyle(): string;
        getProps(): {};
        getData():{};
        getMethods():{};
        getComputed():{};
        getWatcher():{};
        getBeforeRender():()=>void
        getAfterRender():()=>void
}
