import react, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPosts, deletePatient} from '../../actions/postAction'
import { Card } from 'reactstrap';
import PropTypes from 'prop-types'
import 'chart.js'
import {DatatablePage} from "./patientTable"
import {DatatablePageUsers} from "./userTable"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getNextDayOfTheWeek } from '../../components/util/analytics';
const Patients = props => (
    <tr key={props.post._id}>
        <td>{props.post.cin}</td>
        <td>{props.post.first_name}</td>
        <td>{props.post.last_name}</td>
        <td>{props.post.date_nais}</td>
        <td>{props.post.address}</td>
        <td>{props.post.email}</td>
        <td>
            {props.post.ills && props.post.ills.length && (
                props.post.ills.map((item) =>
                    <p>- {item}</p>
                )
            )}
        </td>
        <td>
            {props.post.created_at}
        </td>
        <td>{props.post.status.stats ? 
                <div>
                    <p>Accepted</p>
                    <p>Date For First Shot : <strong>{props.post.call_date.substr(0,10)}</strong></p>
                </div> 
                : "Pending"
            }
        </td>
        <td>
            {props.post.priority}
        </td>
        <td>
            {props.post.call_date}
        </td>
        <td>
            <div style={{display:"block"}}>
                <div style={{margin:"5px"}}>
                    <Link to={"/dashboard/" + props.post._id} className="btn btn-primary" style={{marginRight:"5px"}}>Edit</Link>
                    {/* <button className="btn btn-danger" onClick={() => props.delete(props.post._id)}>Delete</button><br/> */}
                    <button className="btn btn-success" style={{marginRight:"5px"}} onClick={ () => {
                        props.accept(props.post._id)
                    } }>Accept</button>
                    <div className="form-group collapse" id="multiCollapseExample1">
                        <form>
                            <input type="text" style={{marginTop: "10px", marginBottom: "10px"}} className="form-control" placeholder="Decline Reason" />
                            <button type="" className="form-control btn btn-warning">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </td>
    </tr>
)
let trueStatus =  {}


class Tables extends Component {

    constructor(props) {
        super(props);
        this.handleDate = this.handleDate.bind(this)
        this.state = {
            NOP: null,
            NOU: null,
            allRecords: [],
            status: {
                stats: true
            },
            users: [],
            dataR: [],
            smallestDate: String
        }
        this.handleDelete = this.handleDelete.bind(this)
        // this.handleAccept = this.handleAccept.bind(this)
    }

    componentDidMount(){
        this.props.fetchPosts();
        axios.get('http://localhost:4000/enroll/')
        .then(res => res.data.map((item) => {
            this.setState({
                NOP: Object.keys(res.data).length,
                allRecords: res.data,
                dataR: res.data
            })
        }));
        axios.get('http://localhost:4000/auth/')
        .then(res => res.data.map((item) => {
            this.setState({
                NOU: Object.keys(res.data).length,
                users: res.data,
            })
        }))

    }

    
    // handleAccept = (id) => {
    //     const stats = {
    //         stats: true
    //     };
    //     axios.get('http://localhost:4000/dashboard/' + id)
    //     .then(res => {
    //         trueStatus = {
    //             cin: res.data.cin,
    //             first_name: res.data.first_name,
    //             last_name: res.data.last_name,
    //             date_nais: res.data.date_nais,
    //             address: res.data.address,
    //             email: res.data.email,
    //             ills: res.data.ills
    //             //status: stats
    //         }
    //         axios.put('http://localhost:4000/dashboard/' + id, trueStatus)
    //         .then(()=>{
    //             window.location.reload()
    //         })
    //     })

    // }

    handleDate(){
        let i = 0;
        let date = new Date().toISOString();
        
        let creationSorted = this.state.allRecords;
        creationSorted.sort((a, b) => a.created_at - b.created_at);
        let newestCreation = new Date().toISOString();
        creationSorted.map( o => {
            if(o.created_at < newestCreation && o.status.stats === false) {
                newestCreation = o.created_at
            }
        });

        let aWeekLater = new Date(
            new Date(newestCreation).getFullYear(), 
            new Date(newestCreation).getMonth(), 
            (new Date(newestCreation).getDate() + 7))
            .toDateString();
        
        if(aWeekLater === new Date().toDateString()) 
        {
            let prioritySorted = this.state.allRecords.sort((a, b) => a.priority - b.priority);
            let top10 = [];
            prioritySorted.map(item => {
                if(item.status.stats === false) {
                    top10.push(item)
                }
            })
            if(top10.length > 10) 
                top10 = prioritySorted.slice(Math.max(top10.length - 10))
            

            let stats = {
                stats: true
            }

            top10.map(item => {
                let setUserDate = {
                    id: item._id,
                    cin: item.cin,
                    first_name: item.first_name,
                    last_name: item.last_name,
                    date_nais: item.date_nais,
                    address: item.address,
                    email: item.email,
                    status: stats,
                    call_date: getNextDayOfTheWeek().toISOString()
                }
                axios.put("http://localhost:4000/dashboard/" + setUserDate.id, setUserDate)
                .then(res => res.json())
            })
            aWeekLater = new Date(
                new Date(newestCreation).getFullYear(), 
                new Date(newestCreation).getMonth(), 
                (new Date(newestCreation).getDate() + 7))
            .toDateString();
        }
        else {
            console.log(`come on: ${new Date(new Date(newestCreation).getFullYear(), new Date(newestCreation).getMonth(), (new Date(newestCreation).getDate() + 7)).toDateString()}`);
        }
    }

    handleDelete = (id) => {
        this.props.deletePatient(id);
    }

    render(){
        window.onload = this.handleDate()
        return (
            <>
                <Card className="mb-4">
                    <div className="card-header">
                        <i className="fa fa-table mr-1"></i>
                        Patients Information ({this.state.NOP}): 
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <DatatablePage info={this.state.allRecords} />
                        </div>
                    </div>
                </Card>
                <Card className="mb-4">
                    <div className="card-header">
                        <i className="fa fa-table mr-1"></i>
                        Users Information ({this.state.NOU}): 
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <DatatablePageUsers delete={this.handleDelete} info={this.state.users} />
                        </div>
                    </div>
                </Card>
            </>
        )
    }
}

Tables.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
    posts: state.posts.items
})
export default connect(mapStateToProps,{fetchPosts,deletePatient})(Tables)