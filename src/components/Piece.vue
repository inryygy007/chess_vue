<template>
  <div
    class="piece"
    :class="[color + '-' + item.name, handleHighLight(item)]"
    :style="handlePosition(item.position)"
    @click="clickPiece(item)"
    v-for="item in blackPieces"
    :key="color + item.name"
  ></div>
</template>
<script setup>
import { defineProps, defineEmits, reactive } from "vue";
const ctx = defineProps({
  color: "",
  blackPieces: [],
});
const emit = defineEmits(["handleHighLight", "handlePosition", "clickPiece"]);
const handleHighLight = (item) => {
  console.log("handleHighLight", emit("handleHighLight", item));
  return emit("handleHighLight", item);
};
const handlePosition = (position) => {
  // console.log('handlePosition',emit("handlePosition", position)); ;
  let pieceSize = 0.68;
  let x = position[0];
  let y = position[1];
  x = (x - 1) * pieceSize - pieceSize / 2;
  y = (y - 1) * pieceSize - pieceSize / 2;
  return "left:" + x + "rem;bottom:" + y + "rem;";
};
const clickPiece = () => {
  emit("clickPiece", item);
};
</script>
<style scoped>
.piece {
  position: absolute;
  width: 0.68rem;
  height: 0.68rem;
  background-position: center;
  background-size: 100% 100%;
  transition: all 0.3s;
}
.blank-item {
  font-size: 0.12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  /* background-color: rgba(100, 100, 100, 0.5); */
}

.blank-item {
  font-size: 0.12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  /* background-color: rgba(100, 100, 100, 0.5); */
}
/* 黑棋 */
.black-j1,
.black-j2 {
  background-image: url("../assets/pieces/-1/j.png");
}
.black-k {
  background-image: url("../assets/pieces/-1/k.png");
}

.black-m1,
.black-m2 {
  background-image: url("../assets/pieces/-1/m.png");
}

.black-p1,
.black-p2 {
  background-image: url("../assets/pieces/-1/p.png");
}

.black-s1,
.black-s2 {
  background-image: url("../assets/pieces/-1/s.png");
}

.black-x1,
.black-x2 {
  background-image: url("../assets/pieces/-1/x.png");
}

.black-z1,
.black-z2,
.black-z3,
.black-z4,
.black-z5 {
  background-image: url("../assets/pieces/-1/z.png");
}
/* 黑棋 */

/* 红棋 */
.red-j1,
.red-j2 {
  background-image: url("../assets/pieces/1/j.png");
}

.red-k {
  background-image: url("../assets/pieces/1/k.png");
}

.red-m1,
.red-m2 {
  background-image: url("../assets/pieces/1/m.png");
}

.red-p1,
.red-p2 {
  background-image: url("../assets/pieces/1/p.png");
}

.red-s1,
.red-s2 {
  background-image: url("../assets/pieces/1/s.png");
}

.red-x1,
.red-x2 {
  background-image: url("../assets/pieces/1/x.png");
}

.red-z1,
.red-z2,
.red-z3,
.red-z4,
.red-z5 {
  background-image: url("../assets/pieces/1/z.png");
}
/* 红棋 */
</style>
