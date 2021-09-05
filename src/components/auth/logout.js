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
            <Link onClick={this.props.logout} href="#" className="dropdown-item">
                <i className="fa fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
            </Link>
        );
    }
}

export default connect(null, {logout})(Logout);
