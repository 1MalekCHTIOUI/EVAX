import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

import {connect} from 'react-redux'
import PropTypes  from 'prop-types';
import {login} from '../../actions/authAction'
import {clearErrors} from '../../actions/errorAction'
import { Alert } from 'reactstrap';

class SignIn extends Component {

  state = {
    email: '',
    password: '',
    msg: null
  }
  
  static propTypes = {
      isAuthenticated: PropTypes.bool,
      error: PropTypes.object.isRequired,
      login: PropTypes.func.isRequired,
      clearErrors: PropTypes.func.isRequired
  }
  
  componentDidUpdate(prevPorps){
      const {error} = this.props;
      if(error !== prevPorps.error){
          if(error.id === "LOGIN_FAIL") {
              this.setState({msg: error.msg.msg})
          }
          else {
              this.setState({msg: null})
          }

      }
  }
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit = e => {
        e.preventDefault();
        const {email, password} = this.state;
        const user = {
          email,password
        }
          this.props.login(user)
    }

    render() {
        return (
            <div className="container" style={{height: "83.6vh"}}>
            {/* <!-- Outer Row --> */}
            <div className="row justify-content-center">
        
              <div className="col-xl-10 col-lg-12 col-md-9">
        
                <div className="card o-hidden border-0 shadow-lg my-5">
                  <div className="card-body p-0">
                    {/* <!-- Nested Row within Card Body --> */}
                    <div className="row">
                      <div className="col-lg-3"></div>
                      <div className="col-lg-6">
                        <div className="p-5">
                          <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                            {this.state.msg ? (
                        <Alert color="danger">{this.state.msg}</Alert>
                        ): null}
                          </div>
                          <form onSubmit={this.onSubmit} className="user">
                            <div className="form-group">
                              <input type="email" name="email" className="form-control form-control-user" id="email" aria-describedby="emailHelp" placeholder="Email" onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                              <input type="password" name="password" className="form-control form-control-user" id="password" placeholder="Password" onChange={this.onChange}/>
                            </div>
                            {/* <div className="form-group">
                              <div className="custom-control custom-checkbox small">
                                <input type="checkbox" className="custom-control-input" id="customCheck"/>
                                <label className="custom-control-label" for="customCheck">Remember Me</label>
                              </div>
                            </div> */}
                            <button type="submit" className="btn btn-primary btn-user btn-block">
                              Login
                            </button>
                            <hr/>
                            <a href="index.html" className="btn btn-google btn-user btn-block">
                              <i className="fab fa-google fa-fw"></i> Login with Google
                            </a>
                            <a href="index.html" className="btn btn-facebook btn-user btn-block">
                              <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                            </a>
                          </form>
                          <hr/>
                          <div className="text-center">
                            <a className="small" href="forgot-password.html">Forgot Password?</a>
                          </div>
                          <div className="text-center">
                            <Link className="small" to="/signup">Create an Account!</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        
              </div>
        
            </div>
        
          </div>
        )
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,

})

export default connect(
  mapStateToProps, {login, clearErrors}
)(SignIn)