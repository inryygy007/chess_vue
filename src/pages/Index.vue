<template>
  <div>
    <!-- 显示走棋的一方 -->
    <div class="status" :class="data.nextCamp > 0 ? 'red' : ''">
      {{ data.nextCamp > 0 ? "红棋" : "黑棋" }}
    </div>
    <!-- 棋盘 -->
    <div class="board">
      <div class="board-wrap">
        <div
          class="piece blank-item"
          :class="methods.handleHighLight(item)"
          :style="methods.handlePosition(item.position)"
          @click="methods.clickPiece(item)"
          v-for="(item, index) in data.blankMap"
          :key="'black' + index"
        ></div>
        <Piece
          color="black"
          :blackPieces="data.blackPieces"
          @clickPiece="methods.clickPiece"
        />
        <Piece
          color="red"
          :blackPieces="data.redPieces"
          @clickPiece="methods.clickPiece"
        />
        <!-- <div
          class="piece"
          :class="['black-' + item.name, methods.handleHighLight(item)]"
          :style="methods.handlePosition(item.position)"
          @click="methods.clickPiece(item)"
          v-for="item in data.blackPieces"
          :key="'black' + item.name"
        ></div> -->

        <!-- <div
          class="piece"
          :class="['red-' + item.name, methods.handleHighLight(item)]"
          :style="methods.handlePosition(item.position)"
          @click="methods.clickPiece(item)"
          v-for="item in data.redPieces"
          :key="'red' + item.name"
        ></div> -->
      </div>
    </div>

    <div v-if="data.over" class="success-panel">
      <div class="success-title">{{ data.winCamp > 0 ? "红棋" : "黑棋" }}赢了！</div>
      <div class="restart" @click="methods.begin">再来一局</div>
      <!-- <div class="restart back" @click="moreGame">更多游戏</div> -->
    </div>
  </div>
</template>
<script setup>
import Piece from "../components/Piece.vue";
import { defineProps, reactive } from "vue";
import Game from "../game";
import Rule from "../game/rule";
defineProps({});
// 数据
const data = reactive({
  nextCamp: -1,
  winCamp: 0,
  over: false,
  blankMap: [],
  blackPieces: [],
  redPieces: [],
  needMovePiece: null,
  highLightPoint: [], // 可移动的点，需要高亮
});
// 方法
const methods = {
  // 开始
  begin() {
    // 那个阵营先走
    data.nextCamp = data.winCamp ? -data.winCamp : 1;
    // 胜利方
    data.winCamp = 0;
    /* 游戏结束 */
    data.over = false;
    // 初始化游戏
    Game.initGame();
    // 生成空的棋盘
    data.blankMap = Game.getBlankMap();
    /* 初始化黑色方阵营的棋子位置 */
    data.blackPieces = Game.getBlackPieces();
    /* 初始化红色方阵营的棋子位置 */
    data.redPieces = Game.getRedPieces();
  },
  /* 处理高亮 */
  handleHighLight(piece) {
    const positionStr = piece.position.toString();
    for (const point of data.highLightPoint) {
      if (point.toString() === positionStr) {
        if (data.needMovePiece && piece.camp === data.needMovePiece.camp) {
          methods.removeHighLightItem(piece);
          return "";
        } else {
          return "active";
        }
      }
    }
  },
  /* 清除高亮 */
  removeHighLightItem(piece) {
    const strArr = [];
    for (const point of data.highLightPoint) {
      strArr.push(point.toString());
    }
    const index = strArr.indexOf(piece.position.toString());
    if (index > -1) {
      data.highLightPoint.splice(index, 1);
    }
  },
  /* 处理位置 */
  handlePosition(position) {
    let pieceSize = 0.68;
    let x = position[0];
    let y = position[1];
    x = (x - 1) * pieceSize - pieceSize / 2;
    y = (y - 1) * pieceSize - pieceSize / 2;
    return "left:" + x + "rem;bottom:" + y + "rem;";
  },
  /* 点击事件 */
  clickPiece(piece) {
    if (data.needMovePiece && data.needMovePiece.camp !== piece.camp) {
      methods.moveToAnim(data.needMovePiece, piece);
      data.needMovePiece = null;
      data.highLightPoint = [];
    } else if (piece.camp && piece.camp === data.nextCamp) {
      data.needMovePiece = piece;
      data.highLightPoint = Rule.getMoveLine(data.needMovePiece);
      console.log(data.highLightPoint);
    }
  },
  moveToAnim(needMovePiece, targetPiece) {
    if (Rule.canMove(needMovePiece, targetPiece, data.highLightPoint)) {
      if (targetPiece.camp && targetPiece.camp !== needMovePiece.camp) {
        methods.removePiece(targetPiece);
      }
      needMovePiece.moveTo(targetPiece.position);
      data.nextCamp = -data.nextCamp;
      // 清除状态
      data.needMovePiece = null;
      data.highLightPoint = [];
    }
  },
  removePiece(piece) {
    if (piece.name === "k") {
      methods.gameOver(-piece.camp);
    }
    if (piece.camp === 1) {
      const index = methods.getPieceIndexByName(data.redPieces, piece);
      data.redPieces.splice(index, 1);
    } else {
      const index = methods.getPieceIndexByName(data.blackPieces, piece);
      data.blackPieces.splice(index, 1);
    }
  },
  gameOver(camp) {
    data.winCamp = camp;
    data.over = true;
  },
  getPieceIndexByName(pieces, piece) {
    for (let index in pieces) {
      if (pieces[index].name === piece.name) {
        return index;
      }
    }
  },
};
methods.begin();
</script>
<style scoped>
.status {
  /* 字体大小 */
  font-size: 0.4rem;
  /* 字体粗细 */
  font-weight: 600;
  /* 字体居中 */
  text-align: center;
  /* 上内边距 */
  padding-top: 0.2rem;
}
.status.red {
  /* 颜色 */
  color: #b82a2a;
}

.board {
  /* 绝对定位 */
  position: absolute;
  /* 上 */
  top: 50%;
  /* 左 */
  left: 50%;
  /* 平移 */
  transform: translate(-50%, -50%);
  /* 宽 */
  width: 7rem;
  /* 高 */
  height: 7.12rem;
  /* 背景图片 */
  background-image: url("../assets/board.png");
  /* 不平铺 */
  background-repeat: no-repeat;
  /* 背景大小 */
  background-size: 100% 100%;
  /* 背景居中 */
  background-position: center;
  /* 盒子阴影 */
  box-shadow: 0.15rem 0.1rem 0.2rem #888888;
}
.board-wrap {
  /* 相对定位 */
  position: relative;
  /* 左 */
  left: 0.84rem;
  /* 上 */
  top: 0.42rem;
  /* 高 */
  height: 6.2rem;
  /* 宽 */
  width: 5.4rem;
}

.piece {
  /* 相对定位 */
  position: absolute;
  /* 宽 */
  width: 0.68rem;
  /* 高 */
  height: 0.68rem;
  /* 背景居中 */
  background-position: center;
  /* 背景大小 */
  background-size: 100% 100%;
  /* 过度 */
  transition: all 0.3s;
}

.blank-item {
  /* 字体大小 */
  font-size: 0.12rem;
  /*  */
  display: flex;
  align-items: center;
  justify-content: center;
  /* 圆角 */
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

.active {
  background-color: rgba(59, 187, 209, 0.5);
  border-radius: 100%;
}
.success-panel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.success-title {
  font-size: 30px;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
}
.restart {
  margin: 20px auto 0;
  width: 120px;
  height: 40px;
  color: #fff;
  font-size: 20px;
  border-radius: 20px;
  background-color: #891e91;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
