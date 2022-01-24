const Trivia = require("./Trivia");
const Poll = require("./Poll");

const TRIVIA_TYPE = 1;
const POLL_TYPE   = 2;

module.exports = questionType => {
    console.log(questionType);
    switch (questionType) {
        case TRIVIA_TYPE:
            return new Trivia();
        case POLL_TYPE:
            return new Poll();
        default:
            throw "Could not find question type";
    }
}