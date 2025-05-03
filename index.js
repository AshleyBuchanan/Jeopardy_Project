const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');

//that was a dirty trick with the text not matching the link ;-D
const url = 'https://rithm-jeopardy.herokuapp.com/api/';
const port = 3000;

const availableIds = [];
const chosenIds = new Set();
let data = [];

(async function () {
    try {
        const response = await axios.get(url + 'categories?count=2000', {
            headers: { 'User-Agent': 'Axios/1.0' }
        });
        await response.data.forEach(element => {
            availableIds.push(element.id);
        });
    } catch (err) {
        console.log('error');
    }
})();

async function getCategories() {

    console.log('-------');

    while (data.length < 6) {
        const id = availableIds[Math.floor(Math.random() * availableIds.length)];
        if (!chosenIds.has(id)) {
            try {
                const response = await axios.get(url + `category?id=${id}`, {
                    headers: { 'User-Agent': 'Axios/1.0' }
                });

                //taking only the data that I want
                const obj = {
                    id: response.data.id,
                    title: response.data.title,
                    clues: [],
                };

                for (let i = 0; i < response.data.clues.length; i++) {
                    obj.clues.push({
                        question: response.data.clues[i].question,
                        answer: response.data.clues[i].answer,
                    });
                }

                chosenIds.add(id);
                data.push(obj);

            } catch (err) {
                console.log('error', err);
            }
        }
    }
};

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/jeopardy/', (req, res) => {
    res.render('jeopardy');
});

app.get('/jeopardy/categories', async (req, res) => {
    data = [];
    chosenIds.clear();
    await getCategories().then(() => {
        res.json(data);
    });
});

app.listen(port, () => console.log(`Jeopardy_Server listening on port:${port}`));
