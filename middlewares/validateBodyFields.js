const { request, response } = require('express');
const { validationResult } = require('express-validator');

const validateBodyFields = (req = request, res = response, next) =>
{
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        const formatedErrors = errors.array().map(err => err.msg);

        return res.status(400).json({
            errors: formatedErrors
        });
    }

    next();
}

module.exports = { validateBodyFields };