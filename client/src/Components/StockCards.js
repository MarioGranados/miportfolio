import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function Cards({name, price}) {
  return (
    <>
    <Card>
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle>{price}</Card.Subtitle>
            <Card.Text> lorem ipsum for es late! </Card.Text>
            <Card.Link>Chart</Card.Link>
            <Button variant='delete'>Remove from portfolio</Button>
        </Card.Body>
    </Card>
        
    </>
  )
}
