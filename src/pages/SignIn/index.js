import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

import {connect} from 'react-redux'
import PropTypes  from 'prop-types';
import {login} from '../../actions/authAction'
import {clearErrors} from '../../actions/errorAction'
import { Alert } from 'reactstrap';
import styles from '../../style.module.css'
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
      clearErrors: PropTypes.func.isRequired,
      auth: PropTypes.object.isRequired
  }
  componentDidMount(){
    
    
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
      const {isAuthenticated} = this.props.auth;
        if(isAuthenticated !== false) {
          return (
            <div className="container" style={{height: "83.6vh"}}>
            {/* <!-- Outer Row --> */}
            <div className="row justify-content-center">
        
              <div className="col-xl-10 col-lg-12 col-md-9">
        
                <div className="card o-hidden border-0 shadow-lg my-5">
                  <div className="card-body p-0">
                    {/* <!-- Nested Row within Card Body --> */}
                    <div className="row" >
                      <div className="col-lg-3"></div>
                      <div className="col-lg-6">
                        <div className="p-5">
                          <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">Vous êtes actuellement connecté</h1>
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
        }else {
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
                            <h1 className="h4 text-gray-900 mb-4">Bienvenu!</h1>
                            {this.state.msg ? (
                        <Alert color="danger">{this.state.msg}</Alert>
                        ): null}
                          </div>
                          <form onSubmit={this.onSubmit} className="user">
                            <div className="form-group" >
                              <input type="email" name="email" className="form-control form-control-user" id="email" aria-describedby="emailHelp" placeholder="Email" onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                              <input type="password" name="password" className="form-control form-control-user" id="password" placeholder="Mot de passe" onChange={this.onChange}/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-user btn-block">
                              Connecter
                            </button>
                            <hr/>
                            <a href="http://www.google.com" className="btn btn-google btn-user btn-block">
                              <i className="fa fa-google fa-fw"></i> Connectez-vous avec Google
                            </a>
                            <a href="index.html" className="btn btn-facebook btn-user btn-block">
                              <i className="fa fa-facebook-f fa-fw"></i> Connectez-vous avec Facebook
                            </a>
                          </form>
                          <hr/>
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
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  auth: state.auth
})

export default connect(
  mapStateToProps, {login, clearErrors}
)(SignIn)