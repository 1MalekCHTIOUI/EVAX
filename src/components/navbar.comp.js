import react, {Component} from 'react';
import { Link } from 'react-router-dom';
import publicIp from 'public-ip'
import {
    Container,
    Navbar, 
    Nav, 
    Button,
    NavbarBrand,
    NavItem,
    Collapse,
    NavbarToggler,
    NavLink
    } from 'reactstrap'
import styles from "../style.module.css"
import RegisterModal from './auth/register.modal';
import SignIn from '../pages/SignIn';
import Logout from './auth/logout';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Fragment } from 'react';


export const getClientIp = async () => await publicIp.v4({
    fallbackUrls: [ "https://ifconfig.co/ip" ]
  });

class Navbars extends Component {
    state = {
        sameIp: false,
        ip: ""
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    
    // componentDidMount(){
    //     getClientIp().then(res => {
    //         if(res.toString() === "196.186.160.71") {
    //             console.log("It's Equal");
    //             this.setState({sameIp: true});
    //         } else {
    //             console.log("It's Not Equal");
    //         }
    //     });
    // }
    
    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className='navbar-text mr-3'>
                        <strong>{ user ? `Welcome ${user.first_name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        )
        const guestLinks = (
            <Fragment>
                    <NavItem>
                        <Link to="/signin">
                            <button className="btn btn-primary">Sign-in <i class="fa fa-sign-in" aria-hidden="true"></i></button>
                        </Link>
                    </NavItem>
            </Fragment>
        )
        return (
            <div>
                <Navbar dark className={styles.colornav} expand="lg" style={{boxShadow: "0 5px 6px -6px black"}}>
                    <NavbarBrand href="/">EVAX</NavbarBrand>
                    <NavbarToggler />
                    
                    <Nav className={`ml-auto`} navbar>
                        { isAuthenticated ? authLinks : guestLinks }
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(Navbars)