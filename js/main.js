document.getElementById("hello_text").textContent = "はじめてのJavaScript";

var count = 0;

var cells;

//ブロックのパターン
var blocks = {
  i:{
    class:"i",
    pattern:[
    [1, 1, 1, 1, 1]
    [1, 1, 1, 1, 1]
    [1, 1, 1, 1, 1]
    ]
  },
  o: {
    class: "o",
    pattern: [
      [1, 1], 
      [1, 1]
    ]
  },
  t: {
    class: "t",
    pattern: [
      [0, 1, 0], 
      [1, 1, 1]
    ]
  },
  s: {
    class: "s",
    pattern: [
      [0, 1, 1], 
      [1, 1, 0]
    ]
  },
  z: {
    class: "z",
    pattern: [
      [1, 1, 0], 
      [0, 1, 1]
    ]
  },
  j: {
    class: "j",
    pattern: [
      [1, 0, 0], 
      [1, 1, 1]
    ]
  },
  l: {
    class: "l",
    pattern: [
      [0, 0, 1], 
      [1, 1, 1]
    ]
  }
};


loadTable();
setInterval(function () {
  count++;
  document.getElementById("hello_text").textContent = "はじめてのJavaScript(" + count + ")";
  if (hasFallingBlock()){
    fallBlocks();
  } else {
    deleteRow();
    generateBlock();
  }
  
}, 1000);

/* ------ ここから下は関数の宣言部分 ------ */

function loadTable() {
  cells = [];
  var td_array = document.getElementsByTagName("td");
  var index = 0;
  for (var row = 0; row < 20; row++) {
    cells[row] = [];
    for (var col = 0; col < 10; col++) {
      cells[row][col] = td_array[index];
      index++;
    }
  }

}

function fallBlocks() {
  // 1. 底についていないか？
  for (var col = 0; col < 10; col++) {
    if (cells[19][col].blockNum === fallingBlockNum) {
      isFalling = false;
      return; // 一番下の行にブロックがいるので落とさない
    }
  }
  // 2. 1マス下に別のブロックがないか？
  for (var row = 18; row >= 0; row--) {
    for (var col = 0; col < 10; col++) {
      if (cells[row][col].blockNum === fallingBlockNum) {
        if (cells[row + 1][col].className !== "" && cells[row + 1][col].blockNum !== fallingBlockNum){
          isFalling = false;
          return; // 一つ下のマスにブロックがいるので落とさない
        }
      }
    }
  }
  // 下から二番目の行から繰り返しクラスを下げていく
  for (var row = 18; row >= 0; row--) {
    for (var col = 0; col < 10; col++) {
      if (cells[row][col].blockNum === fallingBlockNum) {
        cells[row + 1][col].className = cells[row][col].className;
        cells[row + 1][col].blockNum = cells[row][col].blockNum;
        cells[row][col].className = "";
        cells[row][col].blockNum = null;
      }
    }
  }
}
var isFalling = false;
function hasFallingBlock(){
// 落下中のブロックがあるか確認する
  return isFalling;
}

function deleteRow(){
  //そろっている行を消す
}
var fallingBlockNum = 0;
function generateBlock(){
  //ランダムにブロックを生成する
  // 1. ブロックパターンからランダムに一つパターンを選ぶ
  var keys = Object.keys(blocks);
  var nextBlockKey = keys[Math.floor(Math.random() * keys.length)];
  var nextBlock = blocks[nextBlockKey];
  var nextFallingBlockNum = fallingBlockNum + 1;
  // 2. 選んだパターンをもとにブロックを配置する
  var pattern = nextBlock.pattern;
  for (var row =0; row < pattern.length; row++) {
    for (var col =0; col < pattern[row].length; col++) {
      if(pattern[row][col]){
        cells[row][col + 3].className = nextBlock.class;//why[col + 3]
        cells[row][col + 3].blockNum = nextFallingBlockNum;
      }
    }
  }

  // 3. 落下中のブロックがあるとする
  isFalling = true;
  fallingBlockNum = nextFallingBlockNum;
}

function moveRight(){
  //ブロックを右に移動させる
}

function moveLeft(){
  //ブロックを左に移動させる
}















