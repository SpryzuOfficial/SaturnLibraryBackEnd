const fs = require('fs');
const { request, response } = require('express');

const Article = require('../models/Article');
const User = require('../models/User');

const upload = async(req = request, res = response) =>
{
    try
    {
        const { title, description } = req.body;
        const { userid } = req.headers;

        const user = await User.findById(userid);

        if(!user)
        {
            return res.status(400).json({
                errors: [ 'User does not exists' ]
            });
        }

        const articleFile = req.files.article;

        const path = `./uploads/${articleFile.name}`;
    
        articleFile.mv(path);

        const article = new Article({ title, description, path, user: userid });

        await article.save();

        res.status(200).json({
            article
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

const download = async(req = request, res = response) =>
{
    try
    {
        const { articleid } = req.headers;

        const article = await Article.findById(articleid);

        if(!article)
        {
            return res.status(400).json({
                errors: [ 'Article does not exists' ]
            });
        }

        res.download(article.path);
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({
            errors: [ 'Internal Server Error' ]
        });
    }
}

const edit = async(req = request, res = response) =>
{
    try
    {
        const { articleid, userid } = req.headers;
        const { title, description } = req.body;
        
        const article = await Article.findByIdAndUpdate(articleid, {title, description});
        
        if(!article)
        {
            return res.status(400).json({
                errors: [ 'Article does not exists' ]
            });
        }

        if(!article.user.equals(userid))
        {
            return res.status(400).json({
                errors: [ 'Forbidden' ]
            });
        }

        const articleFile = req.files?.article;

        if(articleFile)
        {
            const path = `./uploads/${articleFile.name}`;

            fs.unlinkSync(article.path);

            articleFile.mv(path);

            article.path = path;

            await article.save();
        }

        res.status(200).json({
            article
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

const remove = async(req = request, res = response) =>
{
    const { articleid, userid } = req.headers;

    const article = await Article.findByIdAndDelete(articleid);

    if(!article)
    {
        return res.status(400).json({
            errors: [ 'Article does not exists' ]
        });
    }

    if(!article.user.equals(userid))
    {
        return res.status(400).json({
            errors: [ 'Forbidden' ]
        });
    }

    fs.unlinkSync(article.path);

    res.status(200).json({
        article
    });
}

module.exports = {
    upload,
    download,
    edit,
    remove,
}