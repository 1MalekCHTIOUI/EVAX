import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {login} from '../../actions/authAction'
import {clearErrors} from '../../actions/errorAction'
import { useHistory } from "react-router-dom";
import {connect} from 'react-redux'
import {fetchPosts} from '../../actions/postAction'
//Navigation

import PageHeading from '../PageHeading';
import Profile from '../admin/Profile.comp'
import Topbar from '../Navigation/Topbar';
import Sidebar from '../Navigation/Sidebar';

class Dashboard extends Component {

  static propTypes = {
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidMount(){
    this.props.fetchPosts();
  }

  constructor(props){
    super(props);
    this.state = {
      auth: true,
    }

  }

  componentDidUpdate(prevPorps){
    const {error} = this.props;
    if(error !== prevPorps.error){
        if(error.msg.msg === "No Authorization") {
          window.location.pathname = "/"
        }
    }
}

render() {
    return (
      <div>
        {/* <!-- Page Wrapper --> */}
        <div id="wrapper">

          {/* <!-- Sidebar --> */}
          <Sidebar />
          {/* <!-- End of Sidebar --> */}

          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">

            {/* <!-- Main Content --> */}
            <div id="content">

              {/* <!-- Topbar --> */}
              <Topbar />
              {/* <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              <div className="container-fluid">

                {/* <!-- Page Heading --> */}

                <PageHeading title="Dashboard" />

                {/* <!-- Content Row --> */}
                <Profile />


              </div>
              {/* <!-- /.container-fluid --> */}

            </div>
            {/* <!-- End of Main Content --> */}

            {/* <!-- Footer --> */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Your Website 2019</span>
                </div>
              </div>
            </footer>
            {/* <!-- End of Footer --> */}

          </div>
          {/* <!-- End of Content Wrapper --> */}

        </div>
        {/* <!-- End of Page Wrapper --> */}

        {/* <!-- Scroll to Top Button--> */}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fa fa-angle-up"></i>
        </a></div>
    )
  }
}

Dashboard.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
  posts: state.posts.items,
  error: state.error,
  auth: state.auth
})

export default connect(mapStateToProps,{fetchPosts, clearErrors})(Dashboard)
