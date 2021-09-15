import React from 'react';
import { MDBDataTable } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
export const DatatablePageUsers = (props) => {
        let DATAS = [];
        if(props.user) {
          props.info.map(item => {
            if(item.email !== props.user.email){
              item.action = 
              (<div>
                <button className="btn btn-danger" onClick={() => {
                props.delete(item._id)}}>Delete</button>
              </div>)
            }
            DATAS.push(item);
          })
        }
        const data = {
        columns: [
          {
            label: 'Nom',
            field: 'last_name',
            width: 70,
            attributes: {
              'aria-controls': 'DataTable',
              'aria-label': 'first_name',
            },
          },
          {
            label: 'Prénom',
            field: 'first_name',
            width: 50,
          },           
          {
            label: 'Email',
            field: 'email',
            width: 50,
          },           
          {
            label: 'Date de Creation',
            field: 'register_date',
            width: 50,
          },                    
          {
            label: "Action",
            field: "action"
          },          
        ],
        rows: DATAS,
    }
    return (
        <MDBDataTable striped bordered hover data={data} />
    );
}


export default DatatablePageUsers
