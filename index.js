const express = require('express');

const app = express();

const routes = {
    auth: '/auth'
}

app.use(express.json());

app.use(routes.auth, require('./routes/auth'));

app.listen(8080, () =>
{
    console.log('Server running on port 8080');
});