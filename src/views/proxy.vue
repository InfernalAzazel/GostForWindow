<template>
    <el-table :data="proxy" style="width: 100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="Name" />
        <el-table-column fixed="right" label="Operations" >
            <template #default>
                <el-button type="warning" size="small" plain>连接</el-button>
                <el-button type="primary" size="small" plain>编辑</el-button>
                <el-button type="info" size="small" plain>分享</el-button>
                <el-button type="danger" size="small" plain>删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import {useProxyStore} from "../store";
const {proxy} = useProxyStore()!
</script>
