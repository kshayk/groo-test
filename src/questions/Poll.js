const PollModel = require('../../model/Poll');
const { checkActiveDatabaseConnection } = require('../../model/Database')
const { vote } = require('./BaseQuestion');

class Poll {
    async addQuestion(data) {
        let answers = data.answers.map((value, index) => {
            return {
                "answer": value,
            }
        });

        if (data.answers.length < 2) {
            throw "Must have more than 1 answer";
        }

        await checkActiveDatabaseConnection();

        let newPoll = await PollModel.create({
            question: data.question,
            answers
        });

        return newPoll._id.toString();
    }

    async getQuestion(questionID) {
        await checkActiveDatabaseConnection();

        let question;
        try {
            question = await PollModel.findById(questionID);
        } catch {
            throw "Failed to find the question";
        }

        let answers = question.answers.map(answer => {
            return {
                answer: answer.answer,
                votes: answer.votes
            }
        });

        return {question: question.question, answers};
    }

    async voteAnswer(questionID, answerIndex) {
        return await vote(PollModel, questionID, answerIndex)
    }
}

module.exports = Poll;