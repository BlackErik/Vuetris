var app = Vue.createApp({
  data() {
    return {
      // Server Information
      game_started: false,
      game_puased: false,
      grid_width: 10,
      grid_height: 20,
      grid_num: 200,
      points: 0,
      blocks: ["O", "I", "T", "L", "J", "S", "Z"],
      grid: [],
      position: [],
      current_block_position: null,
      board_blocks: [],
      current_block: "",
      held_block_name: "",
      already_held: false,
    };
  },
  methods: {
    rotate() {
      if (this.game_started == false) {
        return;
      }
      console.log(this.position);
      switch (this.current_block) {
        case "I":
          this.rotateI();
          break;
        case "T":
          this.rotateT();
          break;
        case "L":
          this.rotateL();
          break;
        case "J":
          this.rotateJ();
          break;
        case "S":
          this.rotateS();
          break;
        case "Z":
          this.rotateZ();
          break;
      }
    },
    rotateI() {
      switch (this.position[4][0]) {
        case "Horizontal":
          this.setPosition1(1, -1);
          this.setPosition3(-1, 1);
          this.setPosition4(-2, 2);

          this.check_location();
          this.setOrientation("Vertical");
          break;
        case "Vertical":
          this.setPosition1(-1, 1);
          this.setPosition3(1, -1);
          this.setPosition4(2, -2);

          this.check_location();
          this.setOrientation("Horizontal");
          break;
      }
    },
    rotateT() {
      switch (this.position[4][0]) {
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
    rotateL() {
      switch (this.position[4][0]) {
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
    rotateJ() {
      switch (this.position[4][0]) {
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
    rotateS() {
      switch (this.position[4][0]) {
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
    rotateZ() {
      switch (this.position[4][0]) {
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
    setPosition1: function (x_change, y_change) {
      this.setOGColor();
      this.position[0][0] += x_change;
      this.position[0][1] += y_change;
      // for (let i = 0; i < 4; i++) {
      //   this.grid[this.position[i][0]][this.position[i][1]].color = "green";
      // }
      this.setColor();
      this.check_location();
    },
    setPosition2: function (x_change, y_change) {
      this.setOGColor();
      this.position[1][0] += x_change;
      this.position[1][1] += y_change;
      // for (let i = 0; i < 4; i++) {
      //   this.grid[this.position[i][0]][this.position[i][1]].color = "green";
      // }
      this.setColor();
      this.check_location();
    },
    setPosition3: function (x_change, y_change) {
      this.setOGColor();
      this.position[2][0] += x_change;
      this.position[2][1] += y_change;
      // for (let i = 0; i < 4; i++) {
      //   this.grid[this.position[i][0]][this.position[i][1]].color = "green";
      // }
      this.setColor();
      this.check_location();
    },
    setPosition4: function (x_change, y_change) {
      this.setOGColor();
      this.position[3][0] += x_change;
      this.position[3][1] += y_change;
      // for (let i = 0; i < 4; i++) {
      //   this.grid[this.position[i][0]][this.position[i][1]].color = "green";
      // }
      this.setColor();
      this.check_location();
    },
    setOGColor: function () {
      for (let i = 0; i < 4; i++) {
        console.log(this.position[i][0]);
        this.grid[this.position[i][0]][this.position[i][1]].color = "OG_color";
      }
    },
    setColor: function () {
      for (let i = 0; i < 4; i++) {
        this.grid[this.position[i][0]][this.position[i][1]].color =
          this.current_block;
      }
    },
    setOrientation: function (orientationValue) {
      this.position[4][0] = orientationValue;
    },
    removeBlocks(grid_row) {
      let count = 0;
      for (let i = 0; i < 10; i++) {
        if (this.grid[i][grid_row].status == 1) {
          count++;
        }
      }
      if (count == 10) {
        this.points += 100;
        for (let i = 0; i < 10; i++) {
          console.log(this.grid[i][grid_row]);
          this.grid[i][grid_row].status = 0;
          this.grid[i][grid_row].color = "OG_color";
          this.shiftRight(i, grid_row);
        }
      }
    },
    shiftRight(i, grid_row) {
      var tile = {
        status: 0,
        class: "tile",
        color: "OG_color",
      };
      this.grid[i].splice(grid_row, 1);
      this.grid[i].unshift(tile);

      // return this.grid[i];
    },
    getRandomShape() {
      let block_name = this.blocks[Math.floor(Math.random() * 7)];
      switch (block_name) {
        case "O":
          return this.o_block;
        case "I":
          return this.i_block;
        case "T":
          return this.t_block;
        case "L":
          return this.l_block;
        case "J":
          return this.j_block;
        case "S":
          return this.s_block;
        case "Z":
          return this.z_block;
      }
    },
    generateHeldBlock: function (current_block) {
      this.setOGColor();
      switch (this.held_block_name) {
        case "O":
          this.generateO();
          break;
        case "I":
          this.generateI();
          break;
        case "T":
          this.generateT();
          break;
        case "L":
          this.generateL();
          break;
        case "J":
          this.generateJ();
          break;
        case "S":
          this.generateS();
          break;
        case "Z":
          this.generateZ();
          break;
      }
      this.already_held = true;
    },
    generateO: function () {
      this.current_block = "O";
      (this.position = [
        [4, 0],
        [5, 0],
        [4, 1],
        [5, 1],
      ]),
        (this.grid[this.position[0][0]][this.position[0][1]].color =
          this.current_block);
      this.grid[this.position[1][0]][this.position[1][1]].color =
        this.current_block;
      this.grid[this.position[2][0]][this.position[2][1]].color =
        this.current_block;
      this.grid[this.position[3][0]][this.position[3][1]].color =
        this.current_block;
    },
    generateI: function () {
      this.current_block = "I";
      this.position = [[3, 0], [4, 0], [5, 0], [6, 0], ["Horizontal"]];
      this.grid[this.position[0][0]][this.position[0][1]].color =
        this.current_block;
      this.grid[this.position[1][0]][this.position[1][1]].color =
        this.current_block;
      this.grid[this.position[2][0]][this.position[2][1]].color =
        this.current_block;
      this.grid[this.position[3][0]][this.position[3][1]].color =
        this.current_block;
    },
    generateT: function () {
      this.current_block = "T";
      this.position = [[3, 1], [4, 1], [5, 1], [4, 0], ["0"]];
      this.grid[this.position[0][0]][this.position[0][1]].color =
        this.current_block;
      this.grid[this.position[1][0]][this.position[1][1]].color =
        this.current_block;
      this.grid[this.position[2][0]][this.position[2][1]].color =
        this.current_block;
      this.grid[this.position[3][0]][this.position[3][1]].color =
        this.current_block;
    },
    generateL: function () {
      this.current_block = "L";
      this.position = [[3, 1], [4, 1], [5, 1], [5, 0], ["0"]];
      this.grid[this.position[0][0]][this.position[0][1]].color =
        this.current_block;
      this.grid[this.position[1][0]][this.position[1][1]].color =
        this.current_block;
      this.grid[this.position[2][0]][this.position[2][1]].color =
        this.current_block;
      this.grid[this.position[3][0]][this.position[3][1]].color =
        this.current_block;
    },
    generateJ: function () {
      this.current_block = "J";
      this.position = [[3, 0], [3, 1], [4, 1], [5, 1], ["0"]];
      this.grid[this.position[0][0]][this.position[0][1]].color =
        this.current_block;
      this.grid[this.position[1][0]][this.position[1][1]].color =
        this.current_block;
      this.grid[this.position[2][0]][this.position[2][1]].color =
        this.current_block;
      this.grid[this.position[3][0]][this.position[3][1]].color =
        this.current_block;
    },
    generateS: function () {
      this.current_block = "S";
      this.position = [[3, 1], [4, 1], [4, 0], [5, 0], ["Horizontal"]];
      this.grid[this.position[0][0]][this.position[0][1]].color =
        this.current_block;
      this.grid[this.position[1][0]][this.position[1][1]].color =
        this.current_block;
      this.grid[this.position[2][0]][this.position[2][1]].color =
        this.current_block;
      this.grid[this.position[3][0]][this.position[3][1]].color =
        this.current_block;
    },
    generateZ: function () {
      this.current_block = "Z";
      this.position = [[3, 0], [4, 0], [4, 1], [5, 1], ["Horizontal"]];
      this.grid[this.position[0][0]][this.position[0][1]].color =
        this.current_block;
      this.grid[this.position[1][0]][this.position[1][1]].color =
        this.current_block;
      this.grid[this.position[2][0]][this.position[2][1]].color =
        this.current_block;
      this.grid[this.position[3][0]][this.position[3][1]].color =
        this.current_block;
    },

    generateBlock: function () {
      this.already_held = 0;
      for (let i = 0; i < 20; i++) {
        this.removeBlocks(i);
      }

      var number = Math.floor(Math.random() * 7);
      if (number == 0) {
        this.generateO();
      }
      if (number == 1) {
        this.generateI();
      }
      if (number == 2) {
        this.generateT();
      }
      if (number == 3) {
        this.generateL();
      }
      if (number == 4) {
        this.generateJ();
      }
      if (number == 5) {
        this.generateS();
      }
      if (number == 6) {
        this.generateZ();
      }
    },
    start: function () {
      this.grid = [];
      this.points = 0;
      this.populateGrid();
      // if (this.current_block == null) {
      this.generateBlock();
      this.game_started = true;
      this.game_paused = false;
      this.held_block_name = "";
      //   this.current_block = !null;
      // }
    },
    populateGrid() {
      row_num = 0;
      col_num = 0;
      for (let i = 0; i < this.grid_width; i++) {
        var grid_row = [];
        for (let j = 0; j < this.grid_height; j++) {
          var tile = {
            status: 0,
            class: "tile",
            color: "OG_color",
          };
          grid_row.push(tile);
        }
        this.grid.push(grid_row);
      }
    },
    moveDown: function () {
      if (this.game_started == false) {
        return;
      }
      for (let i = 0; i < 4; i++) {
        console.log(this.position[i][0]);
        this.grid[this.position[i][0]][this.position[i][1]].color = "OG_color";
        this.position[i][1] += 1;
      }
      for (let i = 0; i < 4; i++) {
        this.grid[this.position[i][0]][this.position[i][1]].color =
          this.current_block;
      }
      this.check_location();
    },
    moveRight: function () {
      if (this.game_started == false) {
        return;
      }
      for (let i = 0; i < 4; i++) {
        console.log(this.position[i][0]);
        this.grid[this.position[i][0]][this.position[i][1]].color = "OG_color";
        this.position[i][0] += 1;
      }
      for (let i = 0; i < 4; i++) {
        this.grid[this.position[i][0]][this.position[i][1]].color =
          this.current_block;
      }
      this.check_location();
    },
    moveLeft: function () {
      if (this.game_started == false) {
        return;
      }
      for (let i = 0; i < 4; i++) {
        this.grid[this.position[i][0]][this.position[i][1]].color = "OG_color";
        this.position[i][0] -= 1;
      }
      for (let i = 0; i < 4; i++) {
        this.grid[this.position[i][0]][this.position[i][1]].color =
          this.current_block;
      }
      this.check_location();
    },
    check_location: function () {
      change = true;
      for (let i = 0; i < 4; i++) {
        if (this.position[i][1] == 19) {
          change = false;
        } else if (
          this.grid[this.position[i][0]][this.position[i][1] + 1].status == 1
        ) {
          change = false;
        }
      }
      if (change == false) {
        for (let j = 0; j < 4; j++) {
          this.grid[this.position[j][0]][this.position[j][1]].status = 1;
        }
        this.generateBlock();
      }
    },
  },
  created: function () {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "c":
          if (!this.already_held) {
            if (this.held_block_name == "") {
              this.held_block_name = this.current_block;
              this.setOGColor();
              this.generateBlock();
            } else {
              let current = this.current_block;
              this.generateHeldBlock();

              this.held_block_name = current;
            }
          }

          break;
        case "Escape":
          if (this.game_started == true) {
            this.game_started = false;
          } else {
            this.game_started = true;
          }
          if (this.game_paused == true) {
            this.game_paused = false;
          } else if (this.game_paused == false) {
            this.game_paused = true;
          }
          break;
        case "ArrowLeft":
          change = true;
          for (let i = 0; i < 4; i++) {
            if (this.position[i][0] == 0) {
              change = false;
            }
            if (
              this.grid[this.position[i][0]][this.position[i][1]].status == 1
            ) {
              change = false;
            }
          }
          if (change == true) {
            this.moveLeft();
            break;
          } else {
            break;
          }
        case "ArrowRight":
          change = true;
          for (let i = 0; i < 4; i++) {
            if (this.position[i][0] == 9) {
              change = false;
            }
            if (
              this.grid[this.position[i][0]][this.position[i][1]].status == 1
            ) {
              change = false;
            }
          }
          if (change == true) {
            this.moveRight();
            break;
          } else {
            break;
          }
        case "ArrowDown":
          change = true;
          for (let i = 0; i < 4; i++) {
            if (this.position[i][1] == 19) {
              change = false;
            }
            if (
              this.grid[this.position[i][0]][this.position[i][1]].status == 1
            ) {
              change = false;
            }
          }
          if (change == true) {
            this.moveDown();
            break;
          } else {
            break;
          }
        case "ArrowUp":
          this.rotate();
          break;
      }
    });
  },
  beforeMount() {
    this.populateGrid();
    setInterval(this.moveDown, 700);
    console.log(this.grid);
  },
}).mount("#app");
