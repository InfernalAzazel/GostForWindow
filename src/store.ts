import { createInjectionState } from '@vueuse/core'
import {Proxy, ProxyYaml} from "./types";
import {reactive, ref} from "vue";
import {BaseDirectory, exists, readTextFile, writeTextFile} from "@tauri-apps/api/fs";
import {PROXY_FILE_NAME, PROXY_FILE_TEXT} from "./global";
import yaml from 'js-yaml';
import {Child, Command} from '@tauri-apps/api/shell';

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

export const [provideProcessesStore, useProcessesStore] = createInjectionState( (initialValue: number) => {
    // state
    const pid = ref(initialValue)
    const cmdID = ref(-1)
    const outputs = ref<string[]>([])
    const running = ref<Proxy>({id: -1, name: '', cmd: ''})
    const runCommand = async (id: number, program: string, args?: string | string[]) => {
        if(pid.value !== 0){
            await kill();
        }
        cmdID.value = id
        const command = new Command(program, args);
        command.on('close', data => {
            console.log(`command finished with code ${data.code} and signal ${data.signal}`)
        });
        command.on('error', error => console.error(`command error: "${error}"`));
        command.stdout.on('data', line => {
            outputs.value.push(line)

        });
        command.stderr.on('data', line => console.log(`command stderr: "${line}"`));
        const child = await command.spawn();
        pid.value = child.pid;
    }
    const kill = async () => {
        if(cmdID.value !== -1){
            cmdID.value = -1
            running.value = {id: -1, name: '', cmd: ''}
        }
        const child = new Child(pid.value)
        await child.kill()
    }
    return {pid, cmdID, running, outputs, runCommand, kill}
})