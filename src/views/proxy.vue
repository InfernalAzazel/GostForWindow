<template>
    <el-button v-if="running.id !== -1" type="success" size="small" @click="onStop" plain>ID: {{ running.id}} 名称: {{ running.name}} 运行中</el-button>
    <el-table :data="proxy" style="width: 100%">
        <el-table-column prop="id" label="ID"/>
        <el-table-column prop="name" label="Name"/>
        <el-table-column fixed="right" label="Operations">
            <template #default="scope">
                <el-button type="warning" size="small" plain @click="onConnect(scope.$index)">连接</el-button>
                <el-button type="primary" size="small" plain>编辑</el-button>
                <el-button type="info" size="small" plain>分享</el-button>
                <el-popconfirm title="你确定要删除这个吗?" @confirm="onDeleteRow(scope.$index)">
                    <template #reference>
                        <el-button type="danger" size="small" plain>删除</el-button>
                    </template>
                </el-popconfirm>

            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import {useProxyStore, useProcessesStore} from "../store";
import {Proxy} from "../types";

const {proxy, writeProxy, readProxy} = useProxyStore()!
const {runCommand, cmdID, kill, running} = useProcessesStore()!
const onDeleteRow = async (index: number) => {
    proxy.value.splice(index, 1)
    await writeProxy(proxy.value)
    await readProxy()
    if(cmdID.value === index){
        await kill()
    }
}

const onConnect = async (index: number) => {
    console.log(index)
    running.value = proxy.value.find(item => item.id === index + 1) as Proxy
    console.log(running.value)
    await runCommand(index, 'ping', ['baidu.com'])
}
const onStop  = async () => {
    await kill()
}

</script>
