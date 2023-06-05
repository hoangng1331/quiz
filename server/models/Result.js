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
        selected_answer: { type: String, required: true },
      },
    ],
    required: true,
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  package_question: { type: Number, required: true },
});

resultSchema.virtual("score").get(function () {
  return this.questions.filter(
    (question) => question.selected_answer === question.correct_answer
  ).length;
});

resultSchema.virtual("score").get(function () {
  return this.questions.filter(
    (question) => question.selected_answer === question.correct_answer
  ).length;
});
resultSchema.virtual("status").get(function () {
  if (
    this.questions.filter(
      (question) => question.selected_answer === question.correct_answer
    ).length >=
    this.questions.length / 2
  ) {
    return "Pass";
  } else {
    return "Fail";
  }
});

// Virtuals in console.log()
resultSchema.set("toObject", { virtuals: true });
// Virtuals in JSON
resultSchema.set("toJSON", { virtuals: true });

const Result = model("Result", resultSchema);

module.exports = Result;
