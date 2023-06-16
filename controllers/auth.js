const { response, request } = require('express');
const User = require('../models/User');

const signup = async(req = request, res = response) =>
{
    try
    {
        const { username, email, password } = req.body;
        
        const user = new User({ username, email, password });
        await user.save();
    
        res.status(200).json({
            user
        });
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({
            errors: [ 'Internal Server Error' ]
        });
    }
}

const login = async(req = request, res = response) =>
{
    try
    {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user)
        {
            return res.status(400).json({
                errors: [ 'User does not exists' ]
            });
        }

        const isValid = user.verifyPasswordSync(password);

        if(!isValid)
        {
            return res.status(400).json({
                errors: [ 'Invalid password' ]
            });
        }

        res.status(200).json({
            user
        });
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({
            errors: [ 'Internal Server Error' ]
        });
    }
}

module.exports = {
    signup,
    login,
}