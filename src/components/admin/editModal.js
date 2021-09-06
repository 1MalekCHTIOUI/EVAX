import axios from 'axios';
import React, { useState } from 'react';
import { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap'
class EditModal extends Component{
    constructor() {
        super();
        this.state = {
            modal: false,
            id: null,
            first_name: "",
            last_name: "",
            email: ""
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount(){
        this.setState({
            id: this.props.users._id,
            first_name: this.props.users.first_name,
            last_name: this.props.users.last_name,
            email: this.props.users.email,
        })
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    onSubmit(e) {
        e.preventDefault();
        let newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
        }
        axios.put("http://localhost:4000/auth/update/" + this.state.id, newUser)
         .then(res => window.location.pathname="/dashboard")
    }
    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

render(){
    return (
        <div>
        <Button color="primary" style={{height: "10vh"}}onClick={this.toggle}>Edit User</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Edit User: <b>{this.props.users.last_name} {this.props.users.first_name}</b></ModalHeader>
            <ModalBody>
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                <Label for="name">Nom</Label>
                <Input
                    type="text"
                    name="last_name"
                    value={this.state.last_name}
                    id="last_name"
                    placeholder="Nom"
                    className="mb-3"
                    onChange={this.onChange}
                />
                <Label for="name">Prénom</Label>
                <Input
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={this.state.first_name}
                    placeholder="Prénom"
                    className="mb-3"
                    onChange={this.onChange}
                />

                <Label for="email">Email</Label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    value={this.state.email}
                    placeholder="Email"
                    className="mb-3"
                    onChange={this.onChange}
                />
{/* 
                <Label for="password">Password</Label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    value={this.props.first_name}
                    placeholder="Password"
                    className="mb-3"
                    onChange={this.onChange}
                /> */}
                <Button color="primary" type="submit" style={{ marginTop: '2rem' }} block>
                    Register
                </Button>
                </FormGroup>
            </Form>
            </ModalBody>
        </Modal>
    </div>
    );
    }
}

export default EditModal;