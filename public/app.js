var app = Vue.createApp({
    data() {
      return {
        // Server Information
        grid_width: 10,
        grid_height: 20,
        blocks: ["O", "I", "T", "L", "J", "S", "Z"],
        grid: [],
      };
    },
    methods: {
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
        spawnBlock() {
          let block = getRandomShape();
        },
        tileClick: function (index1, index2) {
          console.log(`${index1}, ${index2}`);
          this.grid[index1][index2].class = 'green';
        },
        populateGrid() {
          for (let i = 0; i < this.grid_height; i++) {
            var grid_row = []
            for (let i = 0; i < this.grid_width; i++) {
                grid_row.push(0);
            }
            this.grid.push(grid_row)
          }
        }
    },
    beforeMount() {
      this.populateGrid()
      console.log(this.grid)
    }
  }).mount("#app");
  