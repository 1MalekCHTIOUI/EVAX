import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../../style.module.css'
import userImage from '../../assets/img/user.png'
import EditModal from './editModal';
import { decode } from 'jsonwebtoken';
class Profile extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    render() {
        const { user } = this.props.auth;
        return (
            <div className="row" style={{background: "rgb(0,0,0,0.2)", width:"35vw", padding:"2rem"}}>
                <div className="col" className={styles.userImage}>
                    <img src={userImage} alt="test" />
                </div>
                <div className="col" className={styles.userBack}>
                    <h5>Nom: {user ? user.last_name : ""} </h5>
                    <h5>Prénom: {user ? user.first_name : ""}</h5>
                    <h5>Email: {user ? user.email : ""}</h5>
                </div>
                <div className="col">
                   <EditModal users={user ? user: ""} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Profile);
