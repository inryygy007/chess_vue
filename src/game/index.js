import Piece from "./piecc";
class Game {
  constructor() {
    this.blankMap = [];
    this.redPieces = [];
    this.blackPieces = [];
  }
  _initArrByData(data_arr){
    let res = [];
    for(let x of data_arr){
      const {name, position, camp, died} = x;
      res.push(new Piece(name, position, camp))
    }
    return res;
  }

  initGame(server_data) {
    if(this.blankMap.length > 0){
      return;
    }
    // 如果服务器没传data 那就还按原来的方式初始化
    if(server_data){ 
      // 服务器的数据, 巧了, 结构基本是一样的
      this.blankMap = this._initArrByData(server_data.blankMap);
      this.redPieces = this._initArrByData(server_data.redPieces);
      this.blackPieces = this._initArrByData(server_data.blackPieces);
    }else{
      this.blankMap = this.initBlankMap();
      this.redPieces = this.initRedPieces();
      this.blackPieces = this.initBlackPieces();
    }
  }
  getBlankMap() {
    return this.blankMap;
  }
  getRedPieces() {
    return this.redPieces;
  }
  getBlackPieces() {
    return this.blackPieces;
  }
  getAllPieces() {
    return [...this.redPieces, ...this.blackPieces];
  }
  initBlankMap = function () {
    const map = [];

    for (let x = 1; x <= 9; x++) {
      for (let y = 10; y > 0; y--) {
        // 生成空白棋盘
        map.push(new Piece("", [x, y], 0));
      }
    }
    return map;
  };
  initRedPieces = function () {
    const MaxRow = 11;
    return [
      new Piece("j1", [1, MaxRow - 1], 1), // 车
      new Piece("j2", [9, MaxRow - 1], 1), // 车
      new Piece("p1", [2, MaxRow - 3], 1), // 炮
      new Piece("p2", [8, MaxRow - 3], 1), // 炮
      new Piece("m1", [2, MaxRow - 1], 1), // 马
      new Piece("m2", [8, MaxRow - 1], 1), // 马
      new Piece("x1", [3, MaxRow - 1], 1), // 相
      new Piece("x2", [7, MaxRow - 1], 1), // 相
      new Piece("s1", [4, MaxRow - 1], 1), // 士
      new Piece("s2", [6, MaxRow - 1], 1), // 士
      new Piece("z1", [1, MaxRow - 4], 1), // 兵
      new Piece("z2", [3, MaxRow - 4], 1), // 兵
      new Piece("z3", [5, MaxRow - 4], 1), // 兵
      new Piece("z4", [7, MaxRow - 4], 1), // 兵
      new Piece("z5", [9, MaxRow - 4], 1), // 兵
      new Piece("k",  [5, MaxRow -1], 1), // 帅
    ];
  };
  initBlackPieces = function () {
    const MaxRow = 11;
    return [
      new Piece("j1", [1, MaxRow - 10], -1),
      new Piece("j2", [9, MaxRow - 10], -1),
      new Piece("p1", [2, MaxRow - 8], -1),
      new Piece("p2", [8, MaxRow - 8], -1),
      new Piece("m1", [2, MaxRow - 10], -1),
      new Piece("m2", [8, MaxRow - 10], -1),
      new Piece("x1", [3, MaxRow - 10], -1),
      new Piece("x2", [7, MaxRow - 10], -1),
      new Piece("s1", [4, MaxRow - 10], -1),
      new Piece("s2", [6, MaxRow - 10], -1),
      new Piece("z1", [1, MaxRow - 7], -1),
      new Piece("z2", [3, MaxRow - 7], -1),
      new Piece("z3", [5, MaxRow - 7], -1),
      new Piece("z4", [7, MaxRow - 7], -1),
      new Piece("z5", [9, MaxRow - 7], -1),
      new Piece("k",  [5, MaxRow - 10], -1),
    ];
  };

  //添加一个根据阵容和名字找子的方法
  findByPosition(position){
    let arr = this.blankMap;
    for(let x of arr){
      if(x.position[0] === position[0] && x.position[1] === position[1]){
        return x;
      }
    }
  }
}
// 那么客户端用的这个数据就需要从服务器那里拿到先

export default new Game();
