import { render } from '@testing-library/react'
import react, { Component } from 'react'
import { illsData } from "./ills-data";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {createPatient} from '../actions/postAction'
import styles from '../style.module.css'
import { clearErrors } from '../actions/errorAction';
import $ from "jquery"
import { Alert, Table } from 'reactstrap';
import { getNextDayOfTheWeek } from './util/analytics';
import axios from 'axios';
let MAX = 0;
const Ills = props => (
    <tr>
        <td>{props.ill.name}</td>
        <td>
            <input type="checkbox" name="ills" class="form-check-input" value={props.ill.name} onChange={props.change}/>
        </td>
    </tr>
);

class Enroll extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this)
        this.state = {
            first_name: "",
            last_name: "",
            date_nais: "",
            address: "",
            email: "",
            ills: [],
            nextDate : getNextDayOfTheWeek("thursday", false),
            status: false,
            prioritiesTable: [],
            tableOfTenOrBelow: [],
            msg: null,
            err: null,
        }
    }
    
    onChange = e => {
        this.setState({ [e.target.name]:e.target.value })
    }

    onChangeIlls = ({target: {checked, value}}) => {
        if (checked) {
            this.setState(({ills}) => ({ills: [...ills, value]}));
        } else {
            this.setState(({ills}) => ({ills: ills.filter(e => e !== value)}));
        }
    };
    static propTypes = {
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevPorps){
        const {error} = this.props;

        if(error !== prevPorps.error){
            if(error.id === "POST_ERROR") {
                this.setState({msg: error.msg})
            }
            else {
                this.setState({msg: null})
            }
        }
    }
    componentDidMount() {
        //let thursday = getNextDayOfTheWeek("thursday", false).toDateString();
        let today = new Date().toDateString().substr(0,3);
        axios.get('http://localhost:4000/enroll/').then(res => res.data.map((item) => {
            this.setState({
                date_nais: item.date_nais,
                prioritiesTable: this.state.prioritiesTable.concat({
                    cin: item.cin,
                    priority: item.priority,
                    status: item.status.stats
                }).sort((a,b) => a.priority - b.priority)
            })
        }))
        //console.log(getNextDayOfTheWeek())
        //console.log(today);

    }
    
    onSubmit(e){
        e.preventDefault();

        const {posts} = this.props;
        if(posts.error) {
            console.log("error");
        }

        let Year = this.state.date_nais.substr(0, 4);
        let Month = this.state.date_nais.substr(5, 2);
        let Day = this.state.date_nais.substr(8,2);
        let date = new Date(this.state.date_nais)
        let age = new Date().getFullYear() - date.getFullYear();
        let priorityAge = Number(age + date.getMonth());
        let dateSum = Number(Year) + Number(Month) + Number(Day);
        let i = 0;


        let newPatient = {
            cin: this.state.cin,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            date_nais: this.state.date_nais,
            address: this.state.address,
            email: this.state.email,
            ills: this.state.ills,
            priority: this.state.ills.length > 0 ? Number(priorityAge + this.state.ills.length) : priorityAge
        }

        this.props.createPatient(newPatient);
    }

    illsList(){
        return illsData.map((item, i)=>{
            return <Ills ill={item} key={i} change={this.onChangeIlls} />
        });
    }
    infoList(){
        return (
            <div>
                <p>CIN: <b>{this.state.cin}</b></p>
                <p>Nom: <b>{this.state.first_name}</b></p>
                <p>Prenom: <b>{this.state.last_name}</b></p>
                <p>date_nais: <b>{new Date(this.state.date_nais).toDateString()}</b></p>
                <p>Adresse: <b>{this.state.address}</b></p>
                <p>Email: <b>{this.state.email}</b></p>
                {this.state.ills.length > 0 ?     
                <table className="table table-striped">
                <thead style={{background:"rgb(206, 204, 204)"}}>
                    <tr>
                        <th>Maladie</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {this.state.ills.map((item, i) => {
                                return <p>{item}</p>
                            })
                            }
                        </td>
                    </tr>
                </tbody>
                </table>
                : ""
                }
            </div>
        )
    }

render(){
    return (
        <div className="container-fluid" className={styles.form}>
            <div className="row" style={{paddingTop: "5vh"}}>
            <div className="col-sm-2"></div>
            <div className="col">
                <h2>Commencer l'Inscription au Vaccin Aujourd'hui <i class="fa fa-clock-o" aria-hidden="true"></i> </h2>
                <form onSubmit={this.onSubmit}>
                <div>
                {this.state.msg ? (
                    <Alert color="danger">{this.state.msg}</Alert>
                ): null}
              {this.state.err ? (
                    <Alert color="danger">{this.state.err}</Alert>
                ): null}
                </div>
                    <div className="form-group">
                        <label>Carte d'Identité National: </label>
                        <input type="text" name="cin" className="form-control" value={this.state.cin} onChange={this.onChange}/>
                    </div>     
                    <div className="row">                 
                        <div className="col">
                            <div className="form-group">
                                <label>Nom: </label>
                                <input type="text" name="last_name" className="form-control" value={this.state.last_name} onChange={this.onChange}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label>Prénom : </label>
                                <input type="text" name="first_name" className="form-control" value={this.state.first_name} onChange={this.onChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Date de Naissance: </label>
                        <input type="date" name="date_nais" className="form-control" value={this.state.date_nais} onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Adresse: </label>
                        <input type="text" name="address" className="form-control" value={this.state.address} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>E-mail: </label>
                        <input type="text" name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>
                    </div>                    
                    <div className="form-group" style={{marginTop:"6vh"}} >
                    <input style={{cursor: "pointer"}}
                        type="text"
                        readOnly
                        className="form-control"
                        placeholder="S'ill vous plait vérifier si vous avez les maladie suivants: "
                        data-toggle="collapse" href="#multiCollapseExample1"
                        />
                    <Table className="form-control" className="collapse" id="multiCollapseExample1" style={{background:"rgb(0,0,0,0.7)",color:'rgb(255,255,255)', borderRadius:"5px"}}>
                        <tbody>
                            {this.illsList()}
                        </tbody>
                    </Table>
                    </div>
                    <button style={{width:"100%", marginTop:"4vh", marginBottom: "8vh"}} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Envoyer</button>

                    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document"  style={{color:"black"}}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Please Confirme Information: </h5>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        {this.infoList()}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                                    <button type="submit" className="btn btn-primary">Confirmer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                </div>
                <div className="col-sm-2"></div>
            </div>
        </div>
    )
}
}

Enroll.propTypes = {
    createPatient: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired

}
const mapStateToProps = state => ({
    posts: state.posts.item,
    error: state.error,
})
export default connect(mapStateToProps, {createPatient, clearErrors})(Enroll)