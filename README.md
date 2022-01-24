## Getting Started

First, make sure you have a running MongoDB in the background with port of 27017.

You will also need to create a .env file in the root of the project directory with the following keys:

```bash
MONGODB_HOST=mongodb://localhost:27017/
MONGODB_DATABASE=groo
```

(this config is for local development only. You might need to use a different host for dev/production environments)

Then, in the project root run:

```bash
npm install
```

After the installation was complete you may start the server by running:

```bash
npm run dev
```

###
### Trying out the endpoints
There are 3 main endpoints to this server: adding a new question, viewing a question and voting for a question's answer.

###
#### add new question endpoint
To add a new question you need to call this endpoint:

```bash
http://localhost:3000/add
```
as a POST method and the question data as a JSON object.

Since there are currently 2 available types (poll and trivia), each type requires a unique JSON object to save the new question.

The trivia question needs "type", "question", "answers" and "correct_answer" as the body of the JSON. For example:

```json
{"type": 1, "question": "why is the sky blue?", "answers": ["Because the water is wet", "Because why not?", "Raleigh scattering", "No one knows"], "correct_answer": 2}
```

The "type" for a trivia question is 1.

The "question" must be a string.

The "answers" must be a list of strings.

The "correct_answer" must be a valid index of the "answers" array.


###
The poll question add request is similar to the trivia add request, only that the poll question does not need a correct answer:

```json
{"type": 2, "question": "Best day of the week?", "answers": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sturday"]}
```

Also, the "type" for poll questions is 2.

The response for the add questions (for both types) will be as follows assuming the call was successful:

```json
{"question_id": "61ee6e35288b4161fc0fb994"}
```

###
#### Get existing question
To get an existing question you need to call this endpoint:

```bash
http://localhost:3000/question/<type>/<id>
```

While the <type> can either be replaced with 1 or 2, depending on the type of question you would like to get.
The <id> is the same ID that you got back from the add endpoint under the "question_id" key.

The response for getting a question will be as follows for trivia questions:

```json
{
  "question": {
    "question": "why is the sky blue?",
    "answers": [
      {
        "answer": "Because the water is wet",
        "is_correct": false,
        "votes": 4
      },
      {
        "answer": "Because why not?",
        "is_correct": false,
        "votes": 0
      },
      {
        "answer": "Raleigh scattering",
        "is_correct": true,
        "votes": 7
      },
      {
        "answer": "No one knows",
        "is_correct": false,
        "votes": 0
      }
    ]
  }
}
```

Note that in a poll question, the answers will not include the "is_correct" key, since there is no correct answer in polls.

###
#### Voting for an answer
To vote for an answer you need to call this endpoint
```bash
http://localhost:3000/vote
```
as a POST method and the voting data as a JSON object.

The request data should have the following structure:
```json
{"type": 1, "questionID": "61ee509322018f830fca7830", "answer": 2}
```

The "type" is the question type and it's either 1 or 2, depending on the type of question you want to answer.

The "questionID" is the ID of the question that can be received when creating a new question, as mentioned above.

The "answer" is the corresponding index of one of the answers in the question data. Sending an index that does not exist will fail to vote.

After voting, the response will return the list of answers and the amount of votes for each of those answers:

```json
{
  "answers": [
    {
      "answer": "Because the water is wet",
      "votes": 4
    },
    {
      "answer": "Because why not?",
      "votes": 0
    },
    {
      "answer": "Raleigh scattering",
      "votes": 8
    },
    {
      "answer": "No one knows",
      "votes": 0
    }
  ]
}
```
