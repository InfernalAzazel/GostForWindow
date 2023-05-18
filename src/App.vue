<template>
    <router-view></router-view>
</template>
<script lang="ts" setup>
import {provideProxyStore} from "./store";
provideProxyStore([])

</script>