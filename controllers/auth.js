const { response, request } = require('express');
const User = require('../models/User');

const signup = async(req = request, res = response) =>
{
    const { username, email, password } = req.body;
    
    const user = new User({ username, email, password });
    await user.save();

    res.status(200).json({
        user,
        msg: 'User registered successfully'
    });
}

module.exports = {
    signup
}