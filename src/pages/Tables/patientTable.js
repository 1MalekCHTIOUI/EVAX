import React from 'react';
import { MDBDataTable } from 'mdbreact';
import { Button } from 'reactstrap';


export const DatatablePage = (props) => {
        let DATAS = [];
        props.info.map(item => {
          DATAS.push(item);
        })
        const data = {
        columns: [
          {
            label: 'CIN',
            field: 'cin',
            width: 150,
            attributes: {
              'aria-controls': 'DataTable',
              'aria-label': 'CIN',
            },
          },
          {
            label: 'Nom',
            field: 'last_name',
            width: 50,
          },          
          {
            label: 'Prénom',
            field: 'first_name',
            width: 50,
          },
          {
            label: 'date_nais',
            field: 'date_nais',
            width: 200,
          },
          {
            label: 'Adresse',
            field: 'address',
            width: 100,
          },
          {
            label: 'Email',
            field: 'email',
            width: 150,
          },
          {
            label: 'Ills',
            field: 'ills',
            width: 100,
          },      
          {
            label: 'Date_creation',
            field: 'created_at',
            width: 100,
          },      
          {
            label: 'Priority',
            field: 'priority',
            width: 100,
          },
          {
            label: 'Rendez_vous',
            field: 'call_date',
            width: 100,
          }
        ],
        rows: DATAS,
    }
    
    return (
        <MDBDataTable striped bordered order={['created_at', 'asc']} hover data={data} />
    );
}