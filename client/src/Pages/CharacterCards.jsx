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
import Pagination from "react-bootstrap/Pagination";

const serverPath = "http://127.0.0.1:8081/api";

const fetchCharacters = async () => {
  try {
    const response = await fetch(`${serverPath}/characters`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error setting characters:", error);
    return [];
  }
};

const CharacterCards = () => {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState(null);

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  console.log(characters);

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

  return (
    <div className="Cards">
      <section>
        <Container fluid="md">
          <div>
            <h1>Characters</h1>
          </div>
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
                          <Link to={"/{"}>
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

          <Pagination>{items}</Pagination>
        </Container>
      </section>
    </div>
  );
};

export default CharacterCards;
