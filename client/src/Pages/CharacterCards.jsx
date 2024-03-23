import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const serverPath = "http://127.0.01:8081/api";

const fetchCharacters = async () => {
  try {
    const response = await fetch(`${serverPath}/characters`);
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {}
};

const CharacterCards = () => {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState(null);

  useEffect(() => {
    fetchCharacters()
    .then((character) => {
      setCharacters(character);
      setLoading(false);
    });
  }, []);

  console.log("Character");
  return (
    <div className="Cards">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>

      {characters.map((character) => (
        <div key={character._id}>
          <h1>{character.name}</h1>
        </div>

      ))} 
      
    </div>
  );
};

export default CharacterCards;
