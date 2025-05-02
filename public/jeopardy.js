const blocks = document.querySelectorAll('.game-cube');
const categoryBlocks = [];
const answerBlocks = [];
for (let i = 0; i < 36; i++) {
    i < 6 ? categoryBlocks.push(blocks[i]) : answerBlocks.push(blocks[i]);
}