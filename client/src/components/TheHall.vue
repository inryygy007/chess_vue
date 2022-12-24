<template>
  <div>
    <ul>
      <li v-for="(item, index) in room" :key="index">
        <button @click="join(index+1)">{{ `房间${index + 1}` }}</button>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router"
const Router= useRouter()
defineProps({});
const room = new Array(50);
const join = (index)=>{
  globalThis.g_ws.send(`/join/${index}`)
  Router.push('/home')
}
</script>
<style scoped></style>
