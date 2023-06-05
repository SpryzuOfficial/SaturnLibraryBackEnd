const mongoose = require('mongoose');

const configDB = () =>
{
    try
    {
        mongoose.connect(process.env.MONGODB);
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = { configDB };