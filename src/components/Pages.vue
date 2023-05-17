<template>
    <div class=" flex flex-row">
        <div class=" w-1/2">
            <slot name="title">{{ title }}</slot>
        </div>
        <div class="w-1/2 flex flex-row-reverse">
            <slot name="extra" />
        </div>
    </div>
    <el-divider />
    <div>
        <slot/>
    </div>
</template>
  
<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  }
})
</script>