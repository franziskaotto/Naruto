import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SelectionPage = () => {
  return (
    <div className="SelectionPage">
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="../../../Images/CharacterTile/AllCharactersRound.jpg"
        />
        <Card.Body>
          <Card.Title>
            Characters
            <Link to={"/characters"}>
              <Button id="btn" variant="secondary">
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </Link>
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};
export default SelectionPage;
