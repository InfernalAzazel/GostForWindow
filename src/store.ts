import { createInjectionState } from '@vueuse/core'
import {Proxy, ProxyYaml} from "./types";
import {ref} from "vue";
import {BaseDirectory, exists, readTextFile, writeTextFile} from "@tauri-apps/api/fs";
import {PROXY_FILE_NAME, PROXY_FILE_TEXT} from "./global";
import yaml from 'js-yaml';

export const [provideProxyStore, useProxyStore] = createInjectionState( (initialValue: Proxy[]) => {
    // state
    const proxy = ref(initialValue)

    const options = { dir: BaseDirectory.AppData }
    // actions
    const readProxy = async () => {
        const proxyYaml = await readTextFile(PROXY_FILE_NAME, { dir: BaseDirectory.AppData });
        yaml.loadAll(proxyYaml, (doc: ProxyYaml) => {
            if(doc){
                proxy.value =  doc.proxy?.map((item, index) => {return { id: index + 1, ...item }}) || [];
            }
        });
    }
    const writeProxy = async (value : Proxy[]) => {
        // @ts-ignore
        const result = value.map(({ id, ...rest }) => rest)
        const proxyYaml: ProxyYaml = { proxy : result}
        const text = yaml.dump(proxyYaml)
        await writeTextFile(PROXY_FILE_NAME, text, options)
    }

    const initProxy = async () => {
        if(!await exists(PROXY_FILE_NAME, options)){
            await writeTextFile(PROXY_FILE_NAME, PROXY_FILE_TEXT, options)
        }else {
           await readProxy()
        }
        console.log('initProxy')
    }
    return { proxy, readProxy, writeProxy, initProxy}
})
