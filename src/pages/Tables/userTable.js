import React from 'react';
import { MDBDataTable } from 'mdbreact';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import {fetchPosts, deletePatient} from '../../actions/postAction'
import PropTypes from 'prop-types'
import { useState } from 'react';
import EditModal from '../../components/admin/editModal'
export const DatatablePageUsers = (props) => {

        let DATAS = [];
        
        props.info.map(item => {
          item.action = 
          (<div>
            <button className="btn btn-danger" onClick={() => {
            props.delete(item._id)}}>Delete</button>
          </div>)
          DATAS.push(item);
        })
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
