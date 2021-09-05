import {vacc, nvacc} from './analytics'
import {fetchPosts, deletePatient} from '../../actions/postAction'
const {items} = fetchPosts
export const state = {
    labels: ['Vaccinated', 'Not Vaccinated'],
    datasets: [
      {
        label: 'Vaccination Statistics',
        backgroundColor: [
            'rgb(255, 73, 17)',
            'rgb(36, 103, 248)'
        ],
        hoverBackgroundColor: [
        '#4B5000',
        '#003079',
        ],
        data: Array
      }
    ]
  }
