<script setup>
import { RouterLink, RouterView } from "vue-router";
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
resize();
document.body.onresize = resize;
</script>

<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <RouterView />
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<style scoped></style>
