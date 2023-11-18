var app = Vue.createApp({
  data() {
    return {
      // Server Information
      game_started: false,
      grid_width: 10,
      grid_height: 20,
      blocks: ["O", "I", "T", "L", "J", "S", "Z"],
      grid: [],
      board_blocks: [],
    };
  },
  methods: {
    getRandomShape() {
      return this.blocks[Math.floor(Math.random() * 7)];
    },
    spawnBlock() {
      let block = this.getRandomShape();
      console.log(block);
      switch (block) {
        case "O":
          var block_dict = {
            name: block,
            position: [[4, 0],[5, 0],[4, 1],[5, 1]],
          };
          this.board_blocks.push(block_dict);
          break;
        case "I":
          var block_dict = {
            name: block,
            position: [[3, 0],[4, 0],[5, 0],[6, 0]]
          };
          this.board_blocks.push(block_dict);
          break;
        case "T":
          var block_dict = {
            name: block,
            position: [[3, 1],[4, 1],[5, 1],[4, 0]]
          };
          this.board_blocks.push(block_dict);
          break;
        case "L":
          var block_dict = {
            name: block,
            position1: [[3, 0],[4, 0],[5, 0],[5, 1]]
          };
          this.board_blocks.push(block_dict);
          break;
        case "J":
          var block_dict = {
            name: block,
            position1: [[3, 0],[3, 1],[4, 1],[5, 1]]
          };
          this.board_blocks.push(block_dict);
          break;
        case "S":
          var block_dict = {
            name: block,
            position1: [[3, 1],[4, 1],[4, 0],[5, 0]]
          };
          this.board_blocks.push(block_dict);
          break;
        case "Z":
          var block_dict = {
            name: block,
            position1: [[3, 0],[4, 0],[4, 1],[5, 1]]
          };
          this.board_blocks.push(block_dict);
          break;
      }
    },
    pieceHere(index1, index2) {
      for (let i = 0; i < this.board_blocks.length; i++) {
        if (
          index1 == this.board_blocks[i].position1[0] &&
          index2 == this.board_blocks[i].position1[1]
        ) {
          return true;
        } else if (
          index1 == this.board_blocks[i].position2[0] &&
          index2 == this.board_blocks[i].position2[1]
        ) {
          return true;
        } else if (
          index1 == this.board_blocks[i].position3[0] &&
          index2 == this.board_blocks[i].position3[1]
        ) {
          return true;
        } else if (
          index1 == this.board_blocks[i].position4[0] &&
          index2 == this.board_blocks[i].position4[1]
        ) {
          return true;
        }
      }
    },
    tileClick: function (index1, index2) {
      console.log(`${index1}, ${index2}`);
      this.grid[index1][index2].class = "green";
    },
    populateGrid() {
      for (let i = 0; i < this.grid_height; i++) {
        var grid_row = [];
        for (let i = 0; i < this.grid_width; i++) {
          grid_row.push(0);
        }
        this.grid.push(grid_row);
      }
      this.game_started = true;
      this.spawnBlock();
    },
    moveLeft: function () {
      this.board_blocks[this.board_blocks.length - 1].position1[0] -= 1;
      this.board_blocks[this.board_blocks.length - 1].position2[0] -= 1;
      this.board_blocks[this.board_blocks.length - 1].position3[0] -= 1;
      this.board_blocks[this.board_blocks.length - 1].position4[0] -= 1;
    },
    moveRight: function () {
      this.board_blocks[this.board_blocks.length - 1].position1[0] += 1;
      this.board_blocks[this.board_blocks.length - 1].position2[0] += 1;
      this.board_blocks[this.board_blocks.length - 1].position3[0] += 1;
      this.board_blocks[this.board_blocks.length - 1].position4[0] += 1;
    },
    moveDown: function () {
      this.board_blocks[this.board_blocks.length - 1].position1[1] += 1;
      this.board_blocks[this.board_blocks.length - 1].position2[1] += 1;
      this.board_blocks[this.board_blocks.length - 1].position3[1] += 1;
      this.board_blocks[this.board_blocks.length - 1].position4[1] += 1;
    },
  },
  created: function () {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.moveLeft();
          break;
        case "ArrowRight":
          this.moveRight();
          break;
        case "ArrowDown":
          this.moveDown();
      }
    });
  },
  beforeMount() {
    console.log(this.grid);
  },
}).mount("#app");
