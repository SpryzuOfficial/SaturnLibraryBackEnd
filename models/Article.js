const { Schema, model, Types } = require('mongoose');

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    path: {
        type: String,
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = model('Article', ArticleSchema);