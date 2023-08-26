if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const router = require('./Router/router');

app.use(bodyparser.json());
app.use(cors());
app.use('/', router);

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.listen(8000, () => {
    console.log('Server only API PIX');
});


