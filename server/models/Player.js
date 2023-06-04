const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const playerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: {
    type: String,
    required: true,
    default: "Female",
    validate: {
      validator: (value) => {
        if (["Female", "Male"].includes(value)) {
          return true;
        }
        return false;
      },
      message: `Payment type: {VALUE} is invalid!`,
    },
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      },
      message: `{VALUE} is not a valid email!`,
    },
    required: [true, "email is required"],
  },
  phoneNumber: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: function (value) {
        const phoneRegex =
          /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        return phoneRegex.test(value);
      },
      message: `{VALUE} is not a valid phone!`,
    },
  },
  birthday: { type: Date },
  password: { type: String, required: true },
});

// Virtuals
playerSchema.virtual("fullName").get(function () {
  return this.lastName + " " + this.firstName;
});

// Virtuals in console.log()
playerSchema.set("toObject", { virtuals: true });
// Virtuals in JSON
playerSchema.set("toJSON", { virtuals: true });

const Player = model("Player", playerSchema);

module.exports = Player;
