import react, { Component } from 'react'
import { Container } from 'react-bootstrap'
import Card from './card.comp'
import { Button, Jumbotron, ListGroupItem } from 'reactstrap';
import { fetchPosts } from '../actions/postAction';
import styles from '../style.module.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { countAccepted, countPending, countRegistered, countVaccinated } from './util/analytics'
class Home extends Component{
    componentDidMount(){
        this.props.fetchPosts();
    }
    render(){
        return(
            <>
            <div className={styles.homeBackground}   style={{height: "90vh"}}>
                <Container style={{
                    paddingTop: "5vh", 
                    background:"rgb(0,0,0,0.8)", 
                    color:"white",
                    height: "100%"
                    }}>
                    <h1 className={styles.showInfo}>Bienvenu Sur VaxiQ</h1>
                    <Container className={styles.showInfo}>
                        <Container style={{padding: '2%'}}>
                            <Link to="/enroll"><button className="btn btn-danger">Commence La Vaccination</button></Link>
                        </Container>                        
                        <Container style={{padding: '2%'}}>
                            <Link to="/verify"><button className="btn btn-danger">Status de Rendez-vous</button></Link>
                        </Container>
                        <h5>Statistiques: </h5>
                        <Container className={styles.block} style={{ width: "50%" }}>
                            <p>Personnes Inscrites: &nbsp;<b>{countRegistered(this.props.posts)}</b></p>
                        </Container>
                        <hr style={{width: "20vw", background:"gray"}}/>
                        <Container className={styles.block} style={{ width: "50%"}}>
                            <p>Personnes acceptées: &nbsp;<b>{countAccepted(this.props.posts)}</b></p>
                        </Container>
                        <hr style={{width: "10vw", background:"gray"}}/>

                        <Container className={styles.block} style={{ width: "50%" }}>
                            <p>Personnes en attente: &nbsp;<b>{countPending(this.props.posts)}</b></p>
                        </Container>

                    </Container>
                </Container>
            </div>

            </>
        )
    }
}
Home.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
    posts: state.posts.items
})
export default connect(mapStateToProps, {fetchPosts})(Home)