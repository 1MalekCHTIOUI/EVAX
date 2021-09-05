import React, {Component} from 'react';
import { Fragment } from 'react';


import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { clickMenuOpen } from '../../../actions/dashAction';
import PropTypes from 'prop-types';
import Logout from '../../auth/logout';


class Topbar extends Component {
    static propTypes = {
      auth: PropTypes.object.isRequired
    }

    render() {
      const { user } = this.props.auth;

      // const authLinks = (
      //     <Fragment>
      //         <NavItem>
      //             <span className='navbar-text mr-3'>
      //                 <strong>{ user ? `Welcome ${user.first_name}` : ''}</strong>
      //             </span>
      //         </NavItem>
      //         <NavItem>
      //             <Logout />
      //         </NavItem>
      //     </Fragment>
      // )
      // const guestLinks = (
      //     <Fragment>
      //             <NavItem>
      //                 <Link to="/signin">
      //                     <button className="btn btn-primary">Sign-in <i class="fa fa-sign-in" aria-hidden="true"></i></button>
      //                 </Link>
      //             </NavItem>
      //     </Fragment>
      // )

      //const { clickMenuOpen } = this.props;

        return (
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            {/* <!-- Sidebar Toggle (Topbar) --> */}
            <button onClick={() => { clickMenuOpen() }}  id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
              <i className="fa fa-bars"></i>
            </button>

            {/* <!-- Topbar Search --> */}
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div className="input-group">
                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fa fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>

            {/* <!-- Topbar Navbar --> */}
            <ul className="navbar-nav ml-auto">

              {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
              <li className="nav-item dropdown no-arrow d-sm-none">
                <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fa fa-search fa-fw"></i>
                </a>
                {/* <!-- Dropdown - Messages --> */}
              </li>


              {/* <!-- Nav Item - User Information --> */}
              <li className="nav-item dropdown no-arrow">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="mr-2 d-none d-lg-inline text-gray-600 meduim">{ user ? `Bienvenu, ${user.first_name} ${user.last_name}` : ''} <i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i></span>
                </a>
                {/* <!-- Dropdown - User Information --> */}
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                  <Link to="/dashboard/profile" className="dropdown-item">
                      <i className="fa fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                      Profil
                  </Link>
                  <a className="dropdown-item" href="#">
                    <i className="fa fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    Paramétres
                  </a>
                  <Logout className={"dropdown-item"} icon={<i className="fa fa-list fa-sm fa-fw mr-2 text-gray-400"></i>}/>
                </div>
              </li>

            </ul>

          </nav>
         
        )
    }
}


// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ clickMenuOpen }, dispatch);

const mapStateToProps = (state) => ({
  //toggled: store.menuState.menuOpen,
  auth: state.auth
});

export default connect(mapStateToProps, null)(Topbar);