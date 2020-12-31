import loader from 'https://cdn.jsdelivr.net/npm/@assemblyscript/loader/index.js';

export async function run(wasmUrl) {
  const {
    exports: {
      init,
      iterate,
      __release,
      __getArray
    }
  } = await loader.instantiate(
    fetch(wasmUrl),
    { }
  )
  
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const cellSize = 4;
  const cols = 200;
  const rows = 100;
  init(rows, cols)
  
  const imageData = ctx.createImageData(cols * cellSize, rows * cellSize);
  for (let i = 3; i < imageData.data.length; i+=4) {
    // make all pixels non-transparent
    imageData.data[i] = 255
  }
  const draw = function(board) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * cellSize, y = i * cellSize;
        const value = 255 * (board[i * cols + j] ^ 1)
        for(let k = 0; k < cellSize; k += 1)
        for(let l = 0; l < cellSize; l += 1) {
          const rowOffset = 4 * (cellSize * i + l) * cols * cellSize
          const offset = rowOffset + j * 4 * cellSize;
          imageData.data[offset + k * cellSize] = value
          imageData.data[offset + k * cellSize + 1] = value
          imageData.data[offset + k * cellSize + 2] = value
        }
      }
    }
    ctx.putImageData(imageData, 0, 0)
  }
  
  let board = new Array(100 * 200)
  window.setInterval(function () {
    const arrayPtr = iterate();
    board = __getArray(arrayPtr);
    __release(arrayPtr)
  }, 1000/30)

  ;(function render() {
    requestAnimationFrame(render)
    draw(board);
  })()
}