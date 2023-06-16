require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');

const { configDB } = require('./database/config');

const app = express();

const routes = {
    auth: '/auth',
    articles: '/articles',
}

configDB();

app.use(express.json());
app.use(fileUpload());

app.use(routes.auth, require('./routes/auth'));
app.use(routes.articles, require('./routes/articles'));

app.listen(8080, () =>
{
    console.log('Server running on port 8080');
});