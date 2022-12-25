<script setup>
import { RouterLink, RouterView } from "vue-router";
import LayoutVue from "./layout/Layout.vue";
const resize = () => {
  let cWidth = document.body.clientWidth;
  let width = (cWidth / 750) * 100;
  if (width > 100) {
    width = 100;
  } else if (width < 32) {
    width = 32;
  }
  document.querySelector("html").style.fontSize = width + "px";
};
// resize();
// document.body.onresize = resize;
</script>

<template>
  <RouterView />
  <!-- <LayoutVue /> -->
</template>

<style scoped></style>
