import React, { Component, Fragment } from "react"; 
import { Route, Link } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import 'font-awesome/css/font-awesome.css'
import $ from 'jquery'
import Home from './components/home.comp'
import Navbar from './components/navbar.comp'
import { BrowserRouter as Router, Switch} from "react-router-dom"; 
import Enroll from "./components/enroll.vaccine.comp"
import Edit from "./components/admin/edit.comp"
import Verify from "./components/verify.comp";
import { Provider } from "react-redux";
import store from './store'

import './App.css'
//import Dashboard from "./components/admin/Sidebar";
import { loadUser } from "./actions/authAction";
import {withRouter} from 'react-router'


import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Cards from "./pages/Cards";
import Charts from "./pages/Charts";
import Topbar from "./components/Navigation/Topbar";
import Navbars from "./components/navbar.comp";
import Footer from "./components/footer";
import Profile from './components/admin/Profile'



class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser());
  } 
  render(){
    return (
      <Provider store={store}>
        <Router> 
          <Switch>
              <Route path="/dashboard" exact component={Dashboard} />
              {/* <Route path="/dashboard/:id" exact component={Edit} /> */}
              <Route path="/dashboard/profile" exact component={Profile} />
              <Fragment>
                <Navbars/>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/enroll" exact component={Enroll} />
                <Route path="/verify" exact component={Verify} />
                {/* <Route path="/signup" component={SignUp} /> */}
                <Route path="/cards" component={Cards} />
                <Route path="/charts" component={Charts} />
                <Footer />
              </Fragment>
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;