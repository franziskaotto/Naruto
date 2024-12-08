const express = require("express");
const router = express.Router();
const CharacterModel = require("../db/character.model");




const paginatedResults = () => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; 
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    try {
      const totalCount = await CharacterModel.countDocuments();
      if (endIndex < totalCount) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }

      // Fetch characters with pagination
      const characters = await CharacterModel.find()
        .limit(limit)
        .skip(startIndex)
        .exec();

      // Attach pagination metadata to the response
      res.paginatedResults = {
        totalCount,
        results: characters,
        pagination: results,
      };
      next();
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Pagination failed",
        error: error.message,
      });
    }
  };
};

router.get("/", paginatedResults(), (req, res) => {
  // Response with paginated results
  res.json(res.paginatedResults);
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
