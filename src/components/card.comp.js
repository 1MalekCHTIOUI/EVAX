import react from 'react'
import { Link } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
export default function Cards(props){
        return (
            <Card style={{background:"#de667a", color:"black"}}>
                <Card.Body>
                    <Card.Title><h3>{props.card.title}</h3></Card.Title>
                    <h6>{props.card.description}</h6>
                    <p className="card-text"></p>
                    <Link to={props.card.link} style={{textDecoration: "none"}}>
                    <Button variant="danger">Start</Button>  
                    </Link>
                </Card.Body>
            </Card>
        )
}