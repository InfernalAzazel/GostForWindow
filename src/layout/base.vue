<template>
    <el-container class="h-screen">
        <el-header class="flex items-center bg-slate-50">
            <p class="italic text-clip text-3xl text-blue-400">Gost</p>
        </el-header>
        <el-main>
            <div class="flex flex-row-reverse">
                <el-button type="primary">导入</el-button>
                <div class="w-2"></div>
                <el-button type="primary" @click="()=> visible = true">创建</el-button>
            </div>
            <div class=" flex justify-center">
                <el-radio-group v-model="radio">
                    <el-radio-button v-for="item in children" :label="item.path" @click="onSelect(item.path)">
                        {{ item.meta.title }}
                    </el-radio-button>
                </el-radio-group>
            </div>
            <router-view class="mt-2"/>
        </el-main>
        <el-dialog v-model="visible" :show-close="false">
            <template #header="{ close, titleId, titleClass }">
                <div class="my-header">
                    <h4 :id="titleId" :class="titleClass">创建</h4>
                </div>
            </template>
            <template #footer>
              <span class="dialog-footer">
                  <el-button type="primary" @click="visible = false">确定</el-button>
                  <el-button @click="visible = false">取消</el-button>
              </span>
            </template>
            <div class="flex flex-col space-y-1">
                <el-input v-model="input" placeholder="我的US服务器"/>
                <el-input v-model="input" placeholder="-L=:7890 -F=http2://:443"/>
            </div>
        </el-dialog>
    </el-container>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router';
import {ElButton} from 'element-plus';

const router = useRouter()
const currentroute = router.options.routes[0].redirect
const children = router.options.routes[0].children
const radio = ref(currentroute?.toString() || '')
const visible = ref(false)
const onSelect = (value: string) => {
    router.push(value)
}
const input = ref('')
</script>

<style scoped></style>
