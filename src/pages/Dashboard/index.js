import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {login} from '../../actions/authAction'
import {clearErrors} from '../../actions/errorAction'
import { useHistory } from "react-router-dom";
import {connect} from 'react-redux'
import {fetchPosts} from '../../actions/postAction'
import {countVaccinated, countNonVaccinated, countAccepted,countPending ,patientsVaccinatedPerNon, countRegistered} from '../../components/util/analytics'
//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import CardInfo from '../../components/Cards/Info';
import ChartDonut from '../../components/Charts/Donut';
import ChartLine from '../../components/Charts/Line';
import PageHeading from '../../components/PageHeading';
import Tables from '../Tables';
import { Pie } from 'react-chartjs-2';
import CardBasic from '../../components/Cards/Basic';
import RegisterModal from '../../components/auth/register.modal';
import { Link } from 'react-router-dom';
import axios from 'axios';
let pending = 0;
let registered = 0;

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
      chartData:{}
    }
    this.datas = this.datas.bind(this)
  }

  componentDidUpdate(prevPorps){
    const {error} = this.props;
    if(error !== prevPorps.error){
      console.log(error.msg);
        if(error.msg.msg === "No Authorization") {
          window.location.pathname = "/"
        }
    }
  }

  datas() {
    // Ajax calls here
    this.setState({
      chartData:{
        labels: ["Registred", "Vaccinate"],
        datasets: [{
            data: [, 1],
            backgroundColor: ['#4e73df', '#1cc88a'],
            hoverBackgroundColor: ['#2e59d9', '#17a673'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      }
    });
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
                <div className="row">
                  <CardInfo title="Earnings (Monthly)"
                    icon="calendar"
                    color="primary"
                    value="$40,000" />

                  <CardInfo title="Earnings (Annual)"
                    icon="calendar"
                    color="success"
                    value="215,000" />

                  <CardInfo title="Tasks"
                    icon="clipboard"
                    color="info"
                    value="50%" />

                  <CardInfo title="Pending Requests"
                    icon="comments"
                    color="warning"
                    value="18" />
                </div>
                <div className="row">
                  <div className="col-xl-8 col-lg-6">
                    <ChartLine />
                  </div>
                  <CardBasic title="Donut Chart">
                  <Pie
                    data = {{
                      labels: ['Accepted', 'Pending'],
                      datasets: [
                            {
                              label: 'Vaccination Statistics',
                              backgroundColor: [
                                'rgba(75, 192, 192)',   
                                'rgba(255, 206, 86)'
                         ],                          
                            data: [
                              countAccepted(this.props.posts),
                              countPending(this.props.posts),
                            ]
                            }
                      ]
                    }}
                    options={{
                      legend:{
                        display:true,
                      }
                    }}
                    />
                    </CardBasic>

                </div>
                <div className="row">
                  <div className="col-xl">
                    <Link to="/signup" className="btn btn-success" role="button">Register User</Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12">
                    <Tables />
                  </div>
                </div>

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
