import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loading from "../Components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
//import Pagination from "react-bootstrap/Pagination";

//TODO: make server path as global var
const serverPath = "http://127.0.0.1:8081/api";

const fetchCharacters = async () => {
  try {
    const response = await fetch(`${serverPath}/characters`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error setting characters:", error);
    return [];
  }
};

const CharacterCards = () => {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchCharacters()
      .then((character) => {
        setCharacters(character);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error setting characters:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }
  console.log("characters: ", characters);
  return (
    <div className="Cards">
      <section>
        <Container fluid="md">
          <Row>
            {characters &&
              characters?.map((character) => (
                <Col sm={4} key={character._id}>
                  <div key={character._id}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img variant="top" src={character.images[0]} />
                      <Card.Body>
                        <Card.Title>
                          {character.name}
                          <Link to={`/characters/${character._id}`}>
                            <Button id="btn" variant="secondary">
                              <FontAwesomeIcon icon={faArrowRight} />
                            </Button>
                          </Link>
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default CharacterCards;
