const express = require("express");
const router = express.Router();
const CharacterModel = require("../db/character.model");

router.get("/", async (req, res) => {
  const characters = await CharacterModel.find();
  return res.json(characters);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const character = await CharacterModel.findById(id);
  return res.json(character);
});

router.get("/search", async (req, res) => {
  try {
    const queryObj = { ...req.query };
    console.log(queryObj);
    const excludedFields = ["name"];
    excludedFields.forEach((el) => delete queryObj[el]);

    for (const key in queryObj) {
      queryObj[key] = { $regex: `^${queryObj[key]}`, $options: "i" };
    }

    //noch mal anschauen warum forEach((el) =>  delete??)
    const query = CharacterModel.find(queryObj);
    const data = await query;

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({
      status: "cant find character",
      message: error,
    });
  }
});

module.exports = router;
