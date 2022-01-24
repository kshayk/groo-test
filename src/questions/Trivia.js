const TriviaModel = require('../../model/Trivia');
const { checkActiveDatabaseConnection } = require('../../model/Database');
const { vote } = require('./BaseQuestion');

class Trivia {
    async addQuestion(data) {
        let answers = data.answers.map((value, index) => {
            return {
                "answer": value,
                "is_correct": data.correct_answer === index
            }
        });

        if (answers.length < 2) {
            throw "Must have more than 1 answer";
        }

        await checkActiveDatabaseConnection();

        let newTrivia = await TriviaModel.create({
            question: data.question,
            answers
        });

        return newTrivia._id.toString();
    }

    async getQuestion(questionID) {
        await checkActiveDatabaseConnection();

        let question;
        try {
            question = await TriviaModel.findById(questionID);
        } catch {
            throw "Failed to find the question";
        }

        let answers = question.answers.map(answer => {
            return {
                answer: answer.answer,
                is_correct: answer.is_correct,
                votes: answer.votes
            }
        });

        return {question: question.question, answers};
    }

    async voteAnswer(questionID, answerIndex) {
        return await vote(TriviaModel, questionID, answerIndex);
    }
}

module.exports = Trivia;