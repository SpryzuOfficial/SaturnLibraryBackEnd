require('dotenv').config();
const express = require('express');
const { configDB } = require('./database/config');

const app = express();

const routes = {
    auth: '/auth'
}

configDB();

app.use(express.json());

app.use(routes.auth, require('./routes/auth'));

app.listen(8080, () =>
{
    console.log('Server running on port 8080');
});