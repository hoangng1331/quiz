const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const resultSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  playerId: {
    type: Schema.Types.ObjectId,
    ref: "Player",
    required: false,
  },
  questions: {
    type: [
      {
        category: { type: String, required: true },
        type: { type: String, required: true },
        difficulty: { type: String, required: true },
        question: { type: String, required: true },
        correct_answer: { type: String, required: true },
        incorrect_answers: { type: Array, required: true },
        mixed_answers: { type: Array, required: true },
        selected_answers: { type: String, required: true },
      },
    ],
    required: true,
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  score: { type: Number, required: true },
});
//

const Result = model("Result", resultSchema);

module.exports = Result;
