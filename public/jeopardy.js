const blocks = document.querySelectorAll('.game-cube');

// to encapsulate data
(async function () {
    const categoryBlocks = [];
    const answerBlocks = [];
    let data = [];

    function addDisplayText(selectable, block, data, count) {
        //console.log(data);
        switch (selectable) {
            case true:
                setTimeout(() => {
                    block.innerText = '?';
                    block.classList.add('clues');
                    block.dataset.question = data.clues[count].question;
                    block.dataset.answer = data.clues[count].answer;
                    answerBlocks.push(block);
                }, 1800 + (100 * count));

                block.addEventListener('click', (event) => {
                    if (block.innerText === '?') {
                        //console.log(block.dataset.answer);
                        block.innerText = block.dataset.question;
                        block.classList.remove('clues');
                        block.classList.add('questions');
                    } else if (block.innerText == block.dataset.question) {
                        block.innerText = block.dataset.answer;
                    } else {
                        // block.innerText = '';
                        block.classList.remove('questions');
                        block.classList.add('empty');
                        block.removeEventListener('click', {}, true);
                    }
                });
                break;

            case false:
                setTimeout(() => {
                    block.innerText = data;
                    block.classList.add('categories');
                    categoryBlocks.push(block);
                }, 200 * count);
                break;
        }
    }

    async function getData() {
        try {
            data = [];  //clear it out;
            const res = await fetch('/jeopardy/categories');
            if (!res.ok) throw new Error('Fetch failed');
            data = await res.json();
            //console.log(data);
            for (let i = 0; i < 6; i++) {
                addDisplayText(false, blocks[i], await data[i].title, i);
            }
            for (let x = 0; x < 6; x++) {
                for (let y = 0; y < 5; y++) {
                    addDisplayText(true, blocks[x + (y * 6) + 6], await data[x], y);
                }
            }
        } catch (err) {
            console.error('Error:', err);
        }
    }
    getData();
})();


