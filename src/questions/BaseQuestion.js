const { checkActiveDatabaseConnection } = require('../../model/Database')

module.exports = {
    vote: async (model, questionID, answerIndex) => {
        await checkActiveDatabaseConnection();

        let question;
        try {
            question = await model.findById(questionID);
        } catch {
            throw "Failed to find the question";
        }

        question.answers[answerIndex].votes++;

        try {
            question = await question.save();
        } catch {
            throw "Failed to update the question";
        }

        return question.answers.map(answer => {
            return { answer: answer.answer, votes: answer.votes }
        })
    }
}