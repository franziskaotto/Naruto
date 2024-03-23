require("dotenv").config();
const mongoose = require("mongoose");
const mongoUrl = process.env.MONGO_URL;

const CharacterModel = require("../db/character.model");

if (!mongoUrl) {
  console.error("Populate, Missing MONGO_URL environment variable");
  process.exit(1);
}

const url = "https://narutodb.xyz/api/character?page=";

let data = { characters: [] };

const fetchCharacterData = async () => {
  try {
    const response = await fetch(url + "1" + "&limit=1500");

    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }

    char = await response.json();
    //console.log(char.characters)

    char.characters.forEach((character) => {
      if (
        character.hasOwnProperty("debut") &&
        character.debut.appearsIn.includes("Anime") &&
        character.id !== 1168 &&
        character.id !== 1189
      ) {
        data.characters.push(character);
      }

    });
  } catch (error) {
    console.error("Error fetching all characters: ", error);
  }
};

const populateCharacters = async (data) => {
  await CharacterModel.deleteMany({});
  const characterArray = data.characters;

  const characterData = characterArray.map((character) => ({
    id: character.id,
    name: character.name,
    images: character.images,
    debut: character.debut,
    jutsu: character.jutsu,
    personal: character.personal,
    family: character.family,
    natureType: character.natureType,
    uniqueTraits: character.uniqueTraits,
    voiceActors: character.voiceActors,
    tools: character.tools,
    rank: character.rank,
  }));
  await CharacterModel.create(...characterData);
  console.log("Character created");
};

const main = async () => {
  console.log("please wait ... ");
  //await fetchData();
  await fetchCharacterData();
  await mongoose.connect(mongoUrl);
  await populateCharacters(data);
  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
