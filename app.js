var app = new Vue({
  el: "#app",
  data: {
    grid_width: 10,
    grid_height: 20,
    blocks: ["O", "I", "T", "L", "J", "S", "Z"],
    grid: [],
    o_block: [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    i_block: [
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
    ],
    t_block: [
      [1, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    l_block: [
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 1, 0, 0],
    ],
    j_block: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [1, 1, 0, 0],
    ],
    s_block: [
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    z_block: [
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
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
    },
    populateGrid() {
      for (let i = 0; i < 200; i++) {
        this.grid.push(0);
      }
    },
  },
});
