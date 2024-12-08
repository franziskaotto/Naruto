import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const serverPath = "http://127.0.0.1:8081/api";

const fetchOneCharacter = async (id) => {
  try {
    const response = await fetch(`${serverPath}/characters/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const CharacterPage = () => {
  const [loading, setLoading] = useState(false);
  const [character, setCharacter] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchOneCharacter(id)
      .then((character) => {
        setCharacter(character);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error getting character with ID: ${id}`, error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="SelectionPage">
      {character && (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={character.images?.[0] || "no picture"} />
          <Card.Body>
            <Card.Title>{character.name}</Card.Title>
            <Card.Text>text</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default CharacterPage;
