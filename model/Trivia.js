const mongoose = require('mongoose');
const { generateBaseSchema } = require('./BaseQuestionSchema');

const AnswerSchema = new mongoose.Schema({
    answer: String,
    is_correct: Boolean,
    votes: {
        type: Number,
        default: 0
    }
});

const TriviaSchema = generateBaseSchema(AnswerSchema);

let TriviaModel;
if (mongoose.models.Trivia) {
    TriviaModel = mongoose.model('Trivia');
} else {
    TriviaModel = mongoose.model('Trivia', TriviaSchema);
}

module.exports = TriviaModel;