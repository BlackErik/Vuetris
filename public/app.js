var app = Vue.createApp({
  data() {
    return {
      // Server Information
      bgColor: "#ffffff",
      game_started: false,
      grid_width: 10,
      grid_height: 20,
      current_block: "",
      blocks: ["O", "I", "T", "L", "J", "S", "Z"],
      grid: [],
      board_blocks: [],
    };
  },
  methods: {
    getBlockColor(index1, index2) {
      for (let i = 0; i < this.board_blocks.length; i++) {
        if (
          index1 == this.board_blocks[i].position1[0] &&
          index2 == this.board_blocks[i].position1[1]
        ) {
          return this.board_blocks[i].color;
        } else if (
          index1 == this.board_blocks[i].position2[0] &&
          index2 == this.board_blocks[i].position2[1]
        ) {
          return this.board_blocks[i].color;
        } else if (
          index1 == this.board_blocks[i].position3[0] &&
          index2 == this.board_blocks[i].position3[1]
        ) {
          return this.board_blocks[i].color;
        } else if (
          index1 == this.board_blocks[i].position4[0] &&
          index2 == this.board_blocks[i].position4[1]
        ) {
          return this.board_blocks[i].color;
        }
      }
    },
    getRandomShape() {
      return this.blocks[Math.floor(Math.random() * 7)];
    },
    nextBlock() {
      this.spawnBlock();
    },
    spawnBlock() {
      let block = this.getRandomShape();
      console.log(block);
      switch (block) {
        case "O":
          var block_dict = {
            name: block,
            color: "yellow",
            position1: [4, 0],
            position2: [5, 0],
            position3: [4, 1],
            position4: [5, 1],
          };
          this.board_blocks.push(block_dict);
          break;
        case "I":
          var block_dict = {
            name: block,
            color: "cyan",
            position1: [3, 0],
            position2: [4, 0],
            position3: [5, 0],
            position4: [6, 0],
            orientation: "Horizontal",
          };
          this.board_blocks.push(block_dict);
          break;
        case "T":
          var block_dict = {
            name: block,
            color: "purple",
            position1: [3, 1],
            position2: [4, 1],
            position3: [5, 1],
            position4: [4, 0],
            orientation: "0",
          };
          this.board_blocks.push(block_dict);
          break;
        case "L":
          var block_dict = {
            name: block,
            color: "orange",
            position1: [3, 1],
            position2: [4, 1],
            position3: [5, 1],
            position4: [5, 0],
            orientation: "0",
          };
          this.board_blocks.push(block_dict);
          break;
        case "J":
          var block_dict = {
            name: block,
            color: "blue",
            position1: [3, 0],
            position2: [3, 1],
            position3: [4, 1],
            position4: [5, 1],
            orientation: "0",
          };
          this.board_blocks.push(block_dict);
          break;
        case "S":
          var block_dict = {
            name: block,
            color: "limegreen",
            position1: [3, 1],
            position2: [4, 1],
            position3: [4, 0],
            position4: [5, 0],
            orientation: "Horizontal",
          };
          this.board_blocks.push(block_dict);
          break;
        case "Z":
          var block_dict = {
            name: block,
            color: "red",
            position1: [3, 0],
            position2: [4, 0],
            position3: [4, 1],
            position4: [5, 1],
            orientation: "Horizontal",
          };
          this.board_blocks.push(block_dict);
          break;
      }
      this.current_block = block;
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
      this.setX(-1);
    },
    moveRight: function () {
      this.setX(1);
    },
    moveDown: function () {
      this.setY(1);
    },
    rotateRight: function () {
      switch (this.current_block) {
        case "O":
          break;
        case "I":
          this.rotateRightI();
          break;
        case "T":
          this.rotateRightT();
          break;
        case "L":
          this.rotateRightL();
          break;
        case "J":
          this.rotateRightJ();
          break;
        case "S":
          this.rotateRightS();
          break;
        case "Z":
          this.rotateRightZ();
          break;
      }
    },
    rotateRightI: function () {
      switch (this.board_blocks[this.board_blocks.length - 1].orientation) {
        case "Horizontal":
          this.setPosition1(1, -1);
          this.setPosition3(-1, 1);
          this.setPosition4(-2, 2);

          this.setOrientation("Vertical");
          break;
        case "Vertical":
          this.setPosition1(-1, 1);
          this.setPosition3(1, -1);
          this.setPosition4(2, -2);

          this.setOrientation("Horizontal");
          break;
      }
    },
    rotateRightT: function () {
      switch (this.board_blocks[this.board_blocks.length - 1].orientation) {
        case "0":
          this.setPosition4(1, 1);
          this.setPosition1(1, -1);
          this.setPosition3(-1, 1);

          this.setOrientation("90");
          break;

        case "90":
          this.setPosition1(-1, 1);
          this.setOrientation("180");
          break;

        case "180":
          this.setPosition4(-1, -1);
          this.setOrientation("270");
          break;

        case "270":
          this.setPosition3(1, -1);
          this.setOrientation("0");
          break;
      }
    },
    rotateRightL: function () {
      switch (this.board_blocks[this.board_blocks.length - 1].orientation) {
        case "0":
          this.setPosition1(1, -1);
          this.setPosition3(-1, 1);
          this.setPosition4(0, 2);
          this.setOrientation("90");
          break;
        case "90":
          this.setPosition1(1, 1);
          this.setPosition3(-1, -1);
          this.setPosition4(-2, 0);
          this.setOrientation("180");
          break;
        case "180":
          this.setPosition1(-1, 1);
          this.setPosition3(1, -1);
          this.setPosition4(0, -2);
          this.setOrientation("270");
          break;
        case "270":
          this.setPosition1(-1, -1);
          this.setPosition3(1, 1);
          this.setPosition4(2, 0);
          this.setOrientation("0");
          break;
      }
    },
    rotateRightJ: function () {
      switch (this.board_blocks[this.board_blocks.length - 1].orientation) {
        case "0":
          this.setPosition1(2, 0);
          this.setPosition2(1, -1);
          this.setPosition4(-1, 1);
          this.setOrientation("90");
          break;
        case "90":
          this.setPosition1(0, 2);
          this.setPosition2(1, 1);
          this.setPosition4(-1, -1);
          this.setOrientation("180");
          break;
        case "180":
          this.setPosition1(-2, 0);
          this.setPosition2(-1, 1);
          this.setPosition4(1, -1);
          this.setOrientation("270");
          break;
        case "270":
          this.setPosition1(0, -2);
          this.setPosition2(-1, -1);
          this.setPosition4(1, 1);
          this.setOrientation("0");
          break;
      }
    },
    rotateRightS: function () {
      switch (this.board_blocks[this.board_blocks.length - 1].orientation) {
        case "Horizontal":
          this.setPosition4(-2, 0);
          this.setPosition1(0, -2);
          this.setOrientation("Vertical");
          break;
        case "Vertical":
          this.setPosition4(2, 0);
          this.setPosition1(0, 2);
          this.setOrientation("Horizontal");
          break;
      }
    },
    rotateRightZ: function () {
      switch (this.board_blocks[this.board_blocks.length - 1].orientation) {
        case "Horizontal":
          this.setPosition3(-1, 0);
          this.setPosition4(-1, -2);
          this.setOrientation("Vertical");
          break;
        case "Vertical":
          this.setPosition3(1, 0);
          this.setPosition4(1, 2);
          this.setOrientation("Horizontal");
          break;
      }
    },
    setX: function (x_change) {
      this.board_blocks[this.board_blocks.length - 1].position1[0] += x_change;
      this.board_blocks[this.board_blocks.length - 1].position2[0] += x_change;
      this.board_blocks[this.board_blocks.length - 1].position3[0] += x_change;
      this.board_blocks[this.board_blocks.length - 1].position4[0] += x_change;
    },
    setY: function (y_change) {
      this.board_blocks[this.board_blocks.length - 1].position1[1] += 1;
      this.board_blocks[this.board_blocks.length - 1].position2[1] += 1;
      this.board_blocks[this.board_blocks.length - 1].position3[1] += 1;
      this.board_blocks[this.board_blocks.length - 1].position4[1] += 1;
    },
    setPosition1: function (x_change, y_change) {
      this.board_blocks[this.board_blocks.length - 1].position1[0] += x_change;
      this.board_blocks[this.board_blocks.length - 1].position1[1] += y_change;
    },
    setPosition2: function (x_change, y_change) {
      this.board_blocks[this.board_blocks.length - 1].position2[0] += x_change;
      this.board_blocks[this.board_blocks.length - 1].position2[1] += y_change;
    },
    setPosition3: function (x_change, y_change) {
      this.board_blocks[this.board_blocks.length - 1].position3[0] += x_change;
      this.board_blocks[this.board_blocks.length - 1].position3[1] += y_change;
    },
    setPosition4: function (x_change, y_change) {
      this.board_blocks[this.board_blocks.length - 1].position4[0] += x_change;
      this.board_blocks[this.board_blocks.length - 1].position4[1] += y_change;
    },
    setOrientation: function (orientationValue) {
      this.board_blocks[this.board_blocks.length - 1].orientation =
        orientationValue;
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
          break;
        case "ArrowUp":
          this.rotateRight();
          break;
        case " ":
          this.nextBlock();
          break;
      }
    });
  },
  beforeMount() {
    console.log(this.grid);
  },
}).mount("#app");
