import react, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchPosts} from '../actions/postAction'
import PropTypes from 'prop-types'
import { Button, Container, Input, Table } from 'reactstrap';
import styles from '../style.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

let Information = props => (
    <div style={{position: "relative", color:"white", background:"black", borderRadius:"4px"}} className={styles.showInfo}>
        <div className={styles.p} style={{padding: "8px", marginTop: "3rem"}}>
        <table className="table" style={{color: "white"}}>
            <thead>
                <th>Carte d'Identité National</th>
                <th>Nom et Prénom</th>
                <th>Statut de Votre Vaccine</th>
            </thead>
            <tbody>
                <tr>
                    <td>{props.info.cin}</td>
                    <td>{props.info.last_name.toUpperCase()} {props.info.first_name}</td>
                    <td>{props.info.status.stats ?
                        ` Accepté Votre Rendez-vous est on: ${new Date(props.info.call_date).toDateString()}` 
                        : " Pending"
                    }</td>
                </tr>
            </tbody>

        </table>
        <hr style={{background: "gray", borderRadius:"5px"}}/>
        <Link to="/" style={{textDecoration: "none", color: "#00fce7"}}>Page d'acceuil <i class="fa fa-arrow-circle-left" aria-hidden="true"></i></Link>
        </div>
    </div>
);

class Verify extends Component {
    constructor(){
        super();
        this.state = {
            cin: "",
            userByCin: [],
            verificationCode: "",
            submited: false,
            correctCode: false,
            enteredCode: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitCode = this.onSubmitCode.bind(this);
    }
    componentDidMount(){
        this.props.fetchPosts();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.newPost) {
            this.props.posts.unshift(nextProps.newPost);
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmitCode(e){
        e.preventDefault();
        console.log(Number(this.state.verificationCode));
        if(Number(this.state.verificationCode) === Number(this.state.enteredCode)) {
            this.setState({
                correctCode: true
            })
        }
        else {
            this.setState({
                correctCode: false
            })
        }
    }
    onSubmit(e) {
        e.preventDefault();
        if(this.state.cin != ""){
            let set = Math.floor(Math.random() * 1000000);
            let TrueCode = {"code": set};
            this.setState({
                submited: true,
                verificationCode: set
            })
            axios.get("http://localhost:4000/enroll/"+this.state.cin).then(res => {
                this.setState({
                    userByCin: res.data
                })
                axios.post("http://localhost:4000/sendmail/" + res.data.map(item => item.email), TrueCode)
                .then(res => console.log(res.status))
            }
            )
        }
    }
    renderElement(){
        document.getElementById("verif").setAttribute("hidden", "");
        return this.state.userByCin.map(item => {
            return <Information info={item} key={item.cin} />
        })
    }
    render(){
        return (
            <div className={styles.homeBackground}>
                <Container style={{
                    paddingTop: "5vh", 
                    background:"rgb(0,0,0,0.8)", 
                    color:"white",
                    height: "100%"}}>
                    <h1>Bienvenu Sur EVAX</h1>
                    <h5>Vérifier Votre Date</h5>
                    <form className="form-inline" onSubmit={this.onSubmit} style={{height:"74vh", display:"flex", justifyContent:"center"}}>
                        <div className="form-group mb-2">
                            <input name="cin" className="form-control" value={this.state.cin} onChange={this.onChange} placeholder="Entrer Votre N° CIN"/>
                        </div>
                        <button type="submit" style={{marginLeft:"1vh"}} className="btn btn-danger mb-2">Vérifier Identité</button>
                        {this.state.submited ? 
                            <div className={styles.showInfo} id="verif" style={{width: "80vw", position: "relative", top: "-10vh"}}>
                                <label>SVP Entre le code de verification</label>
                                <input type="text" className="form-control" name="enteredCode" value={this.state.enteredCode} onChange={this.onChange} />
                                <button className="btn btn-success" onClick={this.onSubmitCode}>Vérifier</button>
                            </div> : ""}
                        <Container>
                            {this.state.correctCode ? this.renderElement() : ""}
                        </Container>
                    </form>

                    
                </Container>
            </div>
        )
    }
}
Verify.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
    posts: state.posts.items
})

export default connect(mapStateToProps, {fetchPosts})(Verify)