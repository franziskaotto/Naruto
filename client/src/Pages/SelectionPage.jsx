import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

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
                view
              </Button>
            </Link>
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};
export default SelectionPage;
