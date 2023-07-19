import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Placeholder from 'react-bootstrap/Placeholder'

export default function Cards(props) {
  const { name, price } = props.props;
  if (!props) {
    return (
      <Card style={{width: '18rem'}}>
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
        </Card.Body>
      </Card>
    );
  }
  return (
    <>
      <Card style={{width: '18rem'}}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle>{price}</Card.Subtitle>
          <Card.Text> lorem ipsum for es late! </Card.Text>
          <Card.Link>Chart</Card.Link>
          <Button variant="delete">Remove from portfolio</Button>
        </Card.Body>
      </Card>
    </>
  );
}
