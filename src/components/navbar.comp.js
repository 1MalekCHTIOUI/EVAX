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
    
    componentDidMount(){
        let myIp = "102.27.50.162";
        getClientIp().then(res => {
            if(res === myIp) {
                this.setState({sameIp: true});
            }
        });
    }
    
    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className='navbar-text mr-3'>
                        <strong>{ user ? `Bienvenu ${user.first_name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                        <Logout className={"nav-link"}/>
                </NavItem>
            </Fragment>
        )
        const guestLinks = (
            this.state.sameIp ? 
            <Fragment>
                    <NavItem>
                        <Link to="/signin">
                            <button className="btn btn-primary">Connecter-vous <i class="fa fa-sign-in" aria-hidden="true"></i></button>
                        </Link>
                    </NavItem>
            </Fragment> 
            : ""
        )
        return (
            <div>
                <Navbar dark className={styles.colornav} expand="lg" style={{boxShadow: "0 5px 6px -6px black"}}>
                    <NavbarBrand href="/">VaxiQ</NavbarBrand>
                    <NavbarToggler />
                    
                    { isAuthenticated ? <NavItem ><i class="fa fa-circle" aria-hidden="true"></i> <Link to="/dashboard" style={{textDecoration:"none", color:"gray"}}> Dashboard</Link></NavItem>: "" }

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