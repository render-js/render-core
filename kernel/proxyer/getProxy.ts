import {ContextController} from "../../system/prototype/ContextController";
import {update_Render} from "../renderer/updateRender";
import {locateInputAddress} from "../../system/utility/react/sectionUtility";

/**
 * @param data
 * @param updater
 */
export function get_proxy_for_method(data: {}, updater: ContextController): any {
    const proxyCache = new WeakMap<object, any>();

    function createDeepProxy(target: any): any {
        if (proxyCache.has(target)) {
            return proxyCache.get(target);
        }

        const proxy = new Proxy(target, {
            set(obj: any, prop: string | symbol, value: any): boolean {
                if (value !== null && typeof value === 'object') {
                    value = createDeepProxy(value);
                }

                Reflect.set(obj, prop, value);

                update_Render(updater);

                try {
                    if (updater.watcher && typeof updater.watcher[prop as string] === 'function') {
                        updater.watcher[prop as string](obj[prop], value);
                    }
                } catch (error) {
                    // silently ignore missing watchers
                }

                locateInputAddress(updater);
                Reflect.deleteProperty(updater, 'origin');

                return true;
            },

            get(obj: any, prop: string | symbol): any {
                const value = Reflect.get(obj, prop);
                if (value !== null && typeof value === 'object') {
                    return createDeepProxy(value);
                }
                return value;
            }
        });

        proxyCache.set(target, proxy);
        return proxy;
    }

    return createDeepProxy(data);
}

/**
 * @param origin
 */
export function get_proxy_for_watcher(origin:object):object
{
    let handles:{} = {};
    return new Proxy(origin,handles);
}

/**
 * @param origin
 */
export function get_proxy_for_computed(origin:object):object
{
    let handles:{} = {};
    return new Proxy(origin,handles);
}