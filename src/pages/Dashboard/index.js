import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {clearErrors} from '../../actions/errorAction'
import {connect} from 'react-redux'
import {fetchPosts} from '../../actions/postAction'
import {countAccepted,countPending ,patientsVaccinatedPerNon} from '../../components/util/analytics'
//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import CardInfo from '../../components/Cards/Info';
import PageHeading from '../../components/PageHeading';
import Tables from '../Tables';
import { Pie } from 'react-chartjs-2';
import CardBasic from '../../components/Cards/Basic';


class Dashboard extends Component {

  static propTypes = {
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
  }

  componentDidMount(){
    this.props.fetchPosts();
  }

  constructor(props){
    super(props);
    this.state = {
      chartData:{}
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
                <div className="row">
                  <CardInfo title="Date"
                    icon="calendar"
                    color="primary"
                    value={new Date().toDateString().replace(/\s+/g, ', ')} />

                  <CardInfo title="Percentage des personnes inscrit % non inscrit"
                    icon="calendar"
                    color="success"
                    value={patientsVaccinatedPerNon(this.props.posts).toString().substr(0, 7) + "%"} />

                  <CardInfo title="Utilisateurs avec un date alloué"
                    icon="clipboard"
                    color="info"
                    value={countAccepted(this.props.posts)} />

                  <CardInfo title="Utilisateurs en attente"
                    icon="comments"
                    color="warning"
                    value={countPending(this.props.posts)} />
                </div>
                <div className="row">

                  <CardBasic title="Statistiques de vaccination">
                  <Pie
                    data = {{
                      labels: ['Accepté', 'En Attente'],
                      datasets: [
                            {
                              label: 'Statistiques de vaccination',
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
                <div className="row" style={{marginBottom: "2%"}}>
                  <div className="col-xl">
                    <a href="/signup" className="btn btn-success" role="button">Crée un compte Admin</a>
                    <a href="/enroll" style={{marginLeft:"1vw"}} className="btn btn-primary" role="button">Inscription</a>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12">
                    <Tables user={this.state.userMail}/>
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
                  <span>Copyright &copy; VaxiQ 2021</span>
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
  error: state.error
})

export default connect(mapStateToProps,{fetchPosts, clearErrors})(Dashboard)
