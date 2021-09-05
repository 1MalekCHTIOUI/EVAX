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

    state = {
        modal: false
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

render(){
    return (
        <div>
        <Button color="primary" onClick={this.toggle}>Edit User</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Edit User: </ModalHeader>
            <ModalBody>
                {this.state.msg ? (
                <Alert color="danger">{this.state.msg}</Alert>
                ): null}
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                <Label for="name">Nom</Label>
                <Input
                    type="text"
                    name="last_name"
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
                    placeholder="Prénom"
                    className="mb-3"
                    onChange={this.onChange}
                />

                <Label for="email">Email</Label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="mb-3"
                    onChange={this.onChange}
                />

                <Label for="password">Password</Label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="mb-3"
                    onChange={this.onChange}
                />
                <Button color="primary" style={{ marginTop: '2rem' }} block>
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