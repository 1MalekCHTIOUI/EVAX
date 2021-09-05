import { render } from '@testing-library/react'
import react, { Component } from 'react'
import { illsData } from "../ills-data";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios';

import { editPatient, updatePatient } from '../../actions/postAction';
import { UPDATE_PATIENT } from '../../actions/types';
import { useHistory, useParams } from 'react-router-dom';
const Ills = props => (
    <tr>
        <td>{props.ill.name}</td>
        <td>
            <input checked={this.state} type="checkbox" name="ills" class="form-check-input" value={props.ill.name} onChange={props.onChangeIlls}/>
        </td>
    </tr>
);

class Edit extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            id: this.props.match.params.id,
            cin: "",
            first_name: "",
            last_name: "",
            date_nais: "",
            address: "",
            phone_number: "",
            ills: [],
            status: false
        }
    }
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        axios.get('http://localhost:4000/dashboard/'+ this.state.id)
            .then(res => {
                this.setState({
                    cin: res.data.cin,
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    date_nais: res.data.date_nais,
                    address: res.data.address,
                    email: res.data.email,
                    ills: res.data.ills,
                    status: res.data.status,
                })
            })

    }

    handleEdit = (post, id) => {
        this.props.editPatient(post, id)
    }

    onChangeIlls = ({target: {checked, value}}) => {
        if (checked) {
            this.setState(({ills}) => ({ills: [...ills, value]}));
        } else {
            this.setState(({ills}) => ({ills: ills.filter(e => e !== value)}));
        }
    };
    onSubmit(e){
        e.preventDefault();

        const newPatient = {
            cin: this.state.cin,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            date_nais: this.state.date_nais,
            address: this.state.address,
            email: this.state.email,
            ills: this.state.ills
        }
        axios.put('http://localhost:4000/dashboard/' + this.state.id, newPatient)
        .then(() => {
            window.location.reload()
        })
    }
    illsList(){
        return illsData.map((item, i)=>(
            <tr>
                <td>{item.name}</td>
                <td>
                    <input 
                        value={item.name} 
                        checked={this.state.ills.includes(item.name)} 
                        type="checkbox" name="ills" 
                        class="form-check-input"
                        onChange={this.onChangeIlls}/>
                </td>
            </tr>
        ))
    }

render(){
    return (
        <div className="container form" id="topMargin">
            <h2>Start Vaccine inscription today</h2>
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col">

                    </div>
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
                    <label>date_nais: </label>
                    <input type="text" name="date_nais" className="form-control" value={this.state.date_nais} onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label>Adresse: </label>
                    <input type="text" name="address" className="form-control" value={this.state.address} onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="text" name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>
                </div>
                <hr />
                <div className="form-group">
                <h5>Please Check If You Have The Following Ills: </h5>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Ill</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.illsList()}
                    </tbody>
                </table>
                </div>

                <button type="reset" className="btn btn-secondary">Annuler</button>
                <button type="submit" className="btn btn-primary">Confirmer</button>
            </form>
        </div>
    )
}
}
    
export default Edit;