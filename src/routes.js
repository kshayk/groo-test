const QuestionFactory = require("./questions/QuestionFactory");

module.exports = app => {
    app.get('/question/:questionType/:questionID', getQuestionClass, async (req, res) => {
        let question;
        try {
            question = await req.body.question_class.getQuestion(req.params.questionID)
        } catch(err) {
            console.log(err); // eventually this would be replaced by some analytics service
            return res.status(400).json({
                error: 'Failed to get question'
            });
        }

        return res.json({question});
    });

    app.post('/add', getQuestionClass, async (req, res) => {
        const data = req.body;

        let questionID;
        try {
            questionID = await data.question_class.addQuestion(data);
        } catch(err) {
            console.log(err);
            return res.status(400).json({
                error: 'Failed to add question. Make sure that the right data is sent'
            });
        }

        res.send({question_id: questionID})
    });

    app.put('/vote', getQuestionClass, async (req, res) => {
        const data = req.body;

        let answers;
        try {
            answers = await data.question_class.voteAnswer(data.questionID, data.answer);
        } catch(err) {
            console.log(err);
            return res.status(400).json({
                error: 'Failed to answer the question. Make sure that the right data is sent'
            });
        }

        res.send({answers})
    });
}

function getQuestionClass(req, res, next) {
    let Question;
    let questionType = req.body.type ?? req.params.questionType
    try {
        Question = QuestionFactory(+questionType);
    } catch {
        return res.status(400).json({
            error: 'Question type does not exist'
        });
    }

    req.body.question_class = Question;
    next();
}