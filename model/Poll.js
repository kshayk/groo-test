const mongoose = require('mongoose');
const { generateBaseSchema } = require('./BaseQuestionSchema');

const AnswerSchema = new mongoose.Schema({
    answer: String,
    votes: {
        type: Number,
        default: 0
    }
});

const PollSchema = generateBaseSchema(AnswerSchema);

let PollModel;
if (mongoose.models.Poll) {
    PollModel = mongoose.model('Poll');
} else {
    PollModel = mongoose.model('Poll', PollSchema);
}

module.exports = PollModel;