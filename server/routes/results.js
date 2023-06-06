const { CONNECTION_STRING } = require("../constants/dbSettings");
const { default: mongoose } = require("mongoose");

const Result = require("../models/Result");
// MONGOOSE
mongoose.set("strictQuery", false);
mongoose.connect(CONNECTION_STRING);

const express = require("express");
const router = express.Router();

/* GET ALL */
router.get("/", function (req, res, next) {
  try {
    Result.find()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

/* GET BY ID */
router.get("/:_id", function (req, res, next) {
  try {
    const { _id } = req.params;
    Result.findById(_id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

/* POST */
router.post("/", function (req, res, next) {
  try {
    const data = req.body;

    const newItem = new Result(data);

    newItem
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

// PATCH
router.patch("/:_id", function (req, res, next) {
  try {
    const { _id } = req.params;
    const data = req.body;

    Result.findByIdAndUpdate(_id, data, {
      new: true,
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (error) {
    res.sendStatus(500);
  }
});

// DELETE
router.delete("/:_id", function (req, res, next) {
  try {
    const { _id } = req.params;
    Result.findByIdAndDelete(_id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

//Query

router.get("/playerId/:playerId", function (req, res, next) {
  try {
    const { playerId } = req.params;
    Result.find({ playerId })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});
router.get("/package/:package_question", function (req, res, next) {
  try {
    const { package_question } = req.params;
    Result.find({ package_question })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});
router.get(
  "/playerId/:playerId/package_question/:package_question",
  function (req, res, next) {
    try {
      const { playerId, package_question } = req.params;
      Result.find({ playerId: playerId, package_question: package_question })
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.status(400).send({ message: err.message });
        });
    } catch (err) {
      res.sendStatus(500);
    }
  }
);

module.exports = router;
