interface EmbedBase {
    getName(): string;
    getTemplate(): string;
    getData(): {};
    getComputed(): {};
    getMethods(): {};
    getWatcher(): {};
    getBeforeRender(): () => void;
    getAfterRender(): () => void;
    getBeforeUpdate(): () => void;
    getAfterUpdate(): () => void;
    getBeforeMount(): () => void;
    getBeforeUnmount(): () => void;
}
export default class ApiComponent implements EmbedBase {
    private readonly name;
    private readonly template;
    private readonly data;
    private readonly methods?;
    private readonly computed?;
    private readonly watcher?;
    private readonly beforeRender?;
    private readonly afterRender?;
    private readonly beforeUpdate?;
    private readonly afterUpdate?;
    private readonly beforeMount?;
    private readonly beforeUnmount?;
    constructor(config: {
        name: string;
        template: string;
        data?: {};
        computed?: {};
        methods?: {};
        watcher?: {};
        beforeRender?: () => void;
        afterRender?: () => void;
        beforeUpdate?: () => void;
        afterUpdate?: () => void;
        beforeMount?: () => void;
        beforeUnmount?: () => void;
    });
    getName(): string;
    getTemplate(): string;
    getData(): {};
    getMethods(): {};
    getComputed(): {};
    getWatcher(): {};
    getBeforeRender(): () => void;
    getAfterRender(): () => void;
    getBeforeUpdate(): () => void;
    getAfterUpdate(): () => void;
    getBeforeMount(): () => void;
    getBeforeUnmount(): () => void;
}
export {};
