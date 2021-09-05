import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
import { NavLink } from 'reactstrap';
import {logout} from '../../actions/authAction'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }
    render() {
        return (
            <Link className={this.props.className} onClick={this.props.logout} href="#">
                {this.props.icon}
                Déconnecter
            </Link>
        );
    }
}

export default connect(null, {logout})(Logout);
