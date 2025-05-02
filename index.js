const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');

const url = 'https://projects.springboard.com/jeopardy/api/';
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/jeopardy/', (req, res) => {
    res.render('jeopardy');
});

app.listen(port, () => console.log(`Jeopardy_Server listening on port:${port}`));
