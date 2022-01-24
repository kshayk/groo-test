const mongoose = require('mongoose');

module.exports = {
    generateBaseSchema: answerSchema => {
        return new mongoose.Schema({
            question: {
                type: String,
                required: true
            },
            answers: [answerSchema]
        });
    }
}