import react, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchPosts} from '../actions/postAction'
import PropTypes from 'prop-types'
import { Alert, Button, Container, Input, Table } from 'reactstrap';
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
                        : "En attente"
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
            enteredCode: "",
            msg: null
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
        this.setState({msg: null})
        if(this.state.cin != ""){
            let set = Math.floor(Math.random() * 1000000);
            let TrueCode = {"code": set};
            this.setState({
                cinExists: false,
                verificationCode: set
            })
            axios.get("https://vaxiq.herokuapp.com/enroll/"+this.state.cin).then(res => {
                console.log(res.status);
                if(res.status === 200) {
                    this.setState({
                        userByCin: res.data,
                        submited: true
                    })
                    axios.post("https://vaxiq.herokuapp.com/sendmail/" + res.data.map(item => item.email), TrueCode)
                    .then(res => console.log(res.status))
                }
            })
            .catch(err => this.setState({
                msg: err.response.data.msg,
            }))

        }
    }
    renderElement(){
        document.getElementById("verif").setAttribute("hidden", "");
        return this.state.userByCin.map(item => {
            return <Information info={item} key={item.cin} />
        })
    }
    render(){
        console.log(this.state.msg);
        return (
            <div className={styles.homeBackground} >
                <Container style={{
                    paddingTop: "5vh", 
                    background:"rgb(0,0,0,0.8)", 
                    color:"white",
                    height: "100%"}}>
                        
                    <h1 className={styles.showInfo} >Bienvenu Sur VaxiQ</h1>
                    <h5 className={styles.showInfo} >Vérifier Votre Date</h5>
                    
                        {this.state.msg ? <Alert color="danger" style={{position:"absolute",width:"30%", left:"35%", top:"25%"}}>{this.state.msg}</Alert> : ""}
                    
                    <form className="form-inline" onSubmit={this.onSubmit} style={{height:"74vh", display:"flex", justifyContent:"center"}}>
                        <div className="form-group mb-2">
                            <input name="cin" className="form-control" value={this.state.cin} onChange={this.onChange} placeholder="Entrer Votre N° CIN"/>
                        </div>
                        <button type="submit" style={{marginLeft:"1vh"}} className="btn btn-danger mb-2">Vérifier Identité</button>
                        {this.state.submited && this.state.msg === null ? 
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