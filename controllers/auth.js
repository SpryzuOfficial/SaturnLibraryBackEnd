const { response, request } = require('express');

const signup = (req = request, res = response) =>
{
    console.log('Endpoint working')
}

module.exports = {
    signup
}