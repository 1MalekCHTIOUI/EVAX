import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes  from 'prop-types';
import {register} from '../../actions/authAction'
import {clearErrors} from '../../actions/errorAction'
import { Alert } from 'reactstrap';
class SignUp extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    msg: null
  }

static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

componentDidUpdate(prevPorps){
    const {error} = this.props;
    if(error !== prevPorps.error){
        if(error.msg.msg === "No Authorization") {
          window.location.pathname = "/"
        }
        if(error.id === "REGISTER_FAIL") {
            this.setState({msg: error.msg.msg})
        }
        else {
            this.setState({msg: null})
        }
    }
}
  onChange = e => {
    this.setState({ [e.target.name]:e.target.value })
  }
  onSubmit = e => {
      e.preventDefault();
      const {first_name, last_name, email, password} = this.state;
      const newUser = {
        first_name,last_name,email,password
      }
      this.props.register(newUser)
  }

    render() {
        return (
            <div className="container" style={{height: "83.6vh"}}>

            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0" >
                {/* <!-- Nested Row within Card Body --> */}
                <div className="row">
                  <div className="col-lg-3 d-none d-lg-block"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Créer un compte!</h1>
                        {this.state.msg ? (
                        <Alert color="danger">{this.state.msg}</Alert>
                        ): null}
                      </div>
                      <form className="user" onSubmit={this.onSubmit}>
                        <div className="form-group row">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input type="text" name="last_name" id="last_name" className="form-control form-control-user" onChange={this.onChange} placeholder="Nom" />
                          </div>
                          <div className="col-sm-6">
                            <input type="text" name="first_name" id="first_name" className="form-control form-control-user" onChange={this.onChange} placeholder="Prénom" />
                          </div>
                        </div>
                        <div className="form-group">
                          <input type="email" name="email" id="email" className="form-control form-control-user" onChange={this.onChange} placeholder="Adresse E-mail" />
                        </div>
                        <div className="form-group row">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input type="password" name="password" id="password" className="form-control form-control-user" onChange={this.onChange} placeholder="Mot de passe" />
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-user btn-block">
                          Créer compte
                        </button>
                        <hr/>
                        <a href="http://www.gmail.com" className="btn btn-google btn-user btn-block">
                          <i className="fa fa-google fa-fw"></i> Crée un compte avec Google
                        </a>
                        <a href="http://www.facebook.com" className="btn btn-facebook btn-user btn-block">
                          <i className="fa fa-facebook-f fa-fw"></i> Crée un compte ave Facebook
                        </a>
                      </form>
                      <hr/>
                      <div className="text-center">
                        <Link className="small" to="/signin">Vous avez déjà un compte? Connecter!</Link>
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
  mapStateToProps, {register, clearErrors}
)(SignUp)
