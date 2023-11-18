var app = Vue.createApp({
  data() {
    return {
      // Server Information
      game_started: false,
      grid_width: 10,
      grid_height: 20,
      grid_num: 200,
      blocks: ["O", "I", "T", "L", "J", "S", "Z"],
      grid: [],
      position: [],
      currentBlock: '',
      board_blocks: [],
    };
  },
  methods: {
    rotate() {
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
      this.position[0][0] += x_change;
      this.position[0][1] += y_change;
    },
    setPosition2: function (x_change, y_change) {
      this.position[1][0] += x_change;
      this.position[1][1] += y_change;
    },
    setPosition3: function (x_change, y_change) {
      this.position[2][0] += x_change;
      this.position[2][1] += y_change;
    },
    setPosition4: function (x_change, y_change) {
      this.position[3][0] += x_change;
      this.position[3][1] += y_change;
    },
    setOrientation: function (orientationValue) {
      this.position[4][0] = orientationValue;
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
    spawnBlockPosition() {
      let block = this.getRandomShape();
      console.log(block);
      switch (block) {
        case "O":
          this.position = [[4, 0],[5, 0],[4, 1],[5, 1]];
          break;
        case "I":
          this.position = [[3, 0],[4, 0],[5, 0],[6, 0]];
          break;
        case "T":
          this.position = [[3, 1],[4, 1],[5, 1],[4, 0]]
          break;
        case "L":
          this.position = [[3, 0],[4, 0],[5, 0],[5, 1]]
          break;
        case "J":
          this.position = [[3, 0],[3, 1],[4, 1],[5, 1]]
          break;
        case "S":
          this.position = [[3, 1],[4, 1],[4, 0],[5, 0]]
          break;
        case "Z":
          this.position = [[3, 0],[4, 0],[4, 1],[5, 1]]
          break;
      }
    },
    generateBlock: function() {
      var number = Math.floor(Math.random() * 7)
        if(number == 0){
          this.position = [[4, 0],[5, 0],[4, 1],[5, 1]],
          this.currentBlock = 'O'
          this.grid[this.position[0][0]][this.position[0][1]].color = 'O';
          this.grid[this.position[1][0]][this.position[1][1]].color = 'O';
          this.grid[this.position[2][0]][this.position[2][1]].color = 'O';
          this.grid[this.position[3][0]][this.position[3][1]].color = 'O';
        }
        if(number == 1){
          this.position = [[3, 0], [4, 0], [5, 0], [6, 0], ["Horizontal"]];
          this.currentBlock = 'I'
          this.grid[this.position[0][0]][this.position[0][1]].color = 'I';
          this.grid[this.position[1][0]][this.position[1][1]].color = 'I';
          this.grid[this.position[2][0]][this.position[2][1]].color = 'I';
          this.grid[this.position[3][0]][this.position[3][1]].color = 'I';
        }
        if(number == 2){
          this.position = [[3, 1], [4, 1], [5, 1], [4, 0], ["0"]];
          this.currentBlock = 'T'
          this.grid[this.position[0][0]][this.position[0][1]].color = 'T';
          this.grid[this.position[1][0]][this.position[1][1]].color = 'T';
          this.grid[this.position[2][0]][this.position[2][1]].color = 'T';
          this.grid[this.position[3][0]][this.position[3][1]].color = 'T';
        }
        if(number == 3){
          this.position = [[3, 1], [4, 1], [5, 1], [5, 0], ["0"]];
          this.currentBlock = 'L'
          this.grid[this.position[0][0]][this.position[0][1]].color = 'L';
          this.grid[this.position[1][0]][this.position[1][1]].color = 'L';
          this.grid[this.position[2][0]][this.position[2][1]].color = 'L';
          this.grid[this.position[3][0]][this.position[3][1]].color = 'L';
        }
        if(number == 4){
          this.position = [[3, 0], [3, 1], [4, 1], [5, 1], ["0"]];
          this.currentBlock = 'J'
          this.grid[this.position[0][0]][this.position[0][1]].color = 'J';
          this.grid[this.position[1][0]][this.position[1][1]].color = 'J';
          this.grid[this.position[2][0]][this.position[2][1]].color = 'J';
          this.grid[this.position[3][0]][this.position[3][1]].color = 'J';
        }
        if(number == 5){
          this.position = [[3, 1], [4, 1], [4, 0], [5, 0], ["Horizontal"]];
          this.currentBlock = 'S'
          this.grid[this.position[0][0]][this.position[0][1]].color = 'S';
          this.grid[this.position[1][0]][this.position[1][1]].color = 'S';
          this.grid[this.position[2][0]][this.position[2][1]].color = 'S';
          this.grid[this.position[3][0]][this.position[3][1]].color = 'S';
        }
        if(number == 6){
          this.position = [[3, 0], [4, 0], [4, 1], [5, 1], ["Horizontal"]];
          this.currentBlock = 'Z'
          this.grid[this.position[0][0]][this.position[0][1]].color = 'Z';
          this.grid[this.position[1][0]][this.position[1][1]].color = 'Z';
          this.grid[this.position[2][0]][this.position[2][1]].color = 'Z';
          this.grid[this.position[3][0]][this.position[3][1]].color = 'Z';
        }
    },
    start: function() {
      if (this.currentBlock == '') {
        this.generateBlock()
      }
    },
    populateGrid() {
      row_num = 0;
      col_num = 0;
      for (let i = 0; i < this.grid_width; i++) {
        var grid_row = [];
        for (let j = 0; j < this.grid_height; j++) {
          var tile = {
            status:0,
            class:'tile',
            color:'OG_color',
          }
          grid_row.push(tile);
        }
        this.grid.push(grid_row);
      }
    },
    moveDown: function() {
      for(let i=0;i<4;i++){
        console.log(this.position[i][0])
        this.grid[this.position[i][0]][this.position[i][1]].color = 'OG_color'
        this.position[i][1] += 1
      }
      for(let i=0;i<4;i++){
        console.log(this.currentBlock)
        this.grid[this.position[i][0]][this.position[i][1]].color = this.currentBlock;
      }
      this.check_location()
    },
    moveRight: function() {
      for(let i=0;i<4;i++){
        console.log(this.position[i][0])
        this.grid[this.position[i][0]][this.position[i][1]].color = 'OG_color'
        this.position[i][0] += 1
      }
      for(let i=0;i<4;i++){
        this.grid[this.position[i][0]][this.position[i][1]].color = this.currentBlock
      }
      this.check_location()
    },
    moveLeft: function() {
      for(let i=0;i<4;i++){
        this.grid[this.position[i][0]][this.position[i][1]].color = 'OG_color'
        this.position[i][0] -= 1
      }
      for(let i=0;i<4;i++){
        this.grid[this.position[i][0]][this.position[i][1]].color = this.currentBlock
      }
      this.check_location()
    },
    check_location: function() {
      change = true;
      for(let i=0;i<4;i++){
        if (this.position[i][1]==19){
          change = false;
        }else if(this.grid[this.position[i][0]][this.position[i][1]+1].status==1){
          change = false;      
        }
      }
      if (change == false){
        for(let j=0;j<4;j++){
          this.grid[this.position[j][0]][this.position[j][1]].status = 1;
        }  
        this.generateBlock()
      }
    },
  },
  created: function () {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          change = true;
          for(let i=0;i<4;i++){
            if(this.position[i][0] == 0){
              change = false;
            }
            if(this.grid[this.position[i][0]][this.position[i][1]].status == 1){
              change = false;
            }
          }
        if(change == true){
          this.moveLeft();
          break;
        }else{
          break
        }
        case "ArrowRight":
          change = true;
          for(let i=0;i<4;i++){
            if(this.position[i][0] == 9){
              change = false;
            }
            if(this.grid[this.position[i][0]][this.position[i][1]].status == 1){
              change = false;
            }
          }
        if(change == true){
          this.moveRight();
          break;
        }else{
          break
        }
        case "ArrowDown":
          change = true;
          for(let i=0;i<4;i++){
            if(this.position[i][1] == 19){
              change = false;
            }
            if(this.grid[this.position[i][0]][this.position[i][1]].status == 1){
              change = false;
            }
          }
        if(change == true){
          this.moveDown();
          break;
        }else{
          break
        }
        case "ArrowUp":
          this.rotate();
          break;
      }
    });
  },
  beforeMount() {
    this.populateGrid();
    console.log(this.grid);
  },
}).mount("#app");
