const { CONNECTION_STRING } = require("../constants/dbSettings");
const { default: mongoose } = require("mongoose");

const Player = require("../models/Player");
// MONGOOSE
mongoose.set("strictQuery", false);
mongoose.connect(CONNECTION_STRING);

const express = require("express");
const router = express.Router();

/* GET ALL */
router.get("/", function (req, res, next) {
  try {
    Player.find()
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
    Player.findById(_id)
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

    const newItem = new Player(data);

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

    Player.findByIdAndUpdate(_id, data, {
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
    Player.findByIdAndDelete(_id)
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

// // ------------------------------------------------------------------------------------------------
// // QUESTIONS 18
// // ------------------------------------------------------------------------------------------------
// router.get('/questions/18', function (req, res, next) {
//   try {
//     const aggregate = [
//       {
//         $lookup: {
//           from: 'products',
//           let: { id: '$_id' },
//           pipeline: [
//             {
//               $match: {
//                 $expr: { $eq: ['$$_id', '$PlayerId'] },
//               },
//             },
//           ],
//           as: 'products',
//         },
//       },
//       {
//         $addFields: { numberOfProducts: { $size: '$products' } },
//       },
//     ];
//     Player.aggregate(aggregate)
//       .then((result) => {
//         res.send(result);
//       })
//       .catch((err) => {
//         res.status(400).send({ message: err.message });
//       });
//   } catch (err) {
//     res.sendStatus(500);
//   }
// });

module.exports = router;
