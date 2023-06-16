const { request, response } = require('express');
const { validationResult } = require('express-validator');

const User = require('../models/User');

const validateUniqueEmail = async(req = request, res = response, next) =>
{
    const { email } = req.body;
    const errorMessages = validationResult(req).array();

    const user = await User.findOne({ email });
    if(user)
    {
        errorMessages.push('Invalid email');
        return res.status(404).json({ ok: false, errors: errorMessages })
    }

    next();
}

module.exports = { validateUniqueEmail };