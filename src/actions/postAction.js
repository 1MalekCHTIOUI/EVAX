import { FETCH_POSTS, NEW_POST, DELETE_ITEM, EDIT_PATIENT, UPDATE_PATIENT, POST_ERROR } from "./types";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { returnErrors } from "./errorAction";

export const fetchPosts = () => dispatch => {
    fetch('http://localhost:4000/dashboard/')
    .then(res => res.json())
    .then(posts => {
        dispatch({
            type: FETCH_POSTS,
            payload: posts
        })
    })
}



export const createPatient = (post) => dispatch => {
    console.log(post.date_nais);
    axios.get('http://localhost:4000/enroll/'+ post.cin)
    .then(res => {
        if(res.data.length === 0){
            if(
                post.first_name === "" 
                || post.last_name === "" 
                || post.date_nais === "" 
                || post.email === "" 
                || post.address === "" 
                || post.cin === "" 
            ) 
            {
                dispatch(returnErrors("Les champs sont vides", 401, 'POST_ERROR'))
                dispatch({
                    type: POST_ERROR
                })
            }
            else if(post.cin.length != 8) {
                dispatch(returnErrors("CIN doit etre 8 characters", 401, 'POST_ERROR'))
                dispatch({
                    type: POST_ERROR
                })
            }
            else {
                fetch('http://localhost:4000/enroll/add',
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(post)
                })
                .then(res => res.json())
                .then(post => dispatch({
                    type: NEW_POST,
                    payload: post
                }))
                .then(res => {
                    window.location.pathname = "/"
                })
                .catch(err => {
                    dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
                    dispatch({
                        type: POST_ERROR
                    })
                })
            }
        }else {
            dispatch(returnErrors("You Have Already Registred", 401, 'POST_ERROR'))
            dispatch({
                type: POST_ERROR
            })
        }
    })

}

// export const editPatient = (post, id) => dispatch => {
//     axios.put(`http://localhost:4000/dashboard/edit/${id}`, post)
//     .then(res => res.json())
//     .then(post => dispatch({
//         type: EDIT_PATIENT,
//         payload: post
//     }))
// }


export const editPatient = id => dispatch => {
    console.log("EDIT CALLED");
    fetch('http://localhost:4000/dashboard/edit/' + id)
    .then(res => res.json())
    .then(posts => {
        dispatch({
            type: EDIT_PATIENT,
            payload: posts
        })
    })
    
}
  
export const updatePatient = (_id, data) => dispatch => {
    axios.post(`http://localhost:4000/dashboard/update/${_id}`, data)
    .then(response =>{
        dispatch({
            type: UPDATE_PATIENT,
            payload: response.data
        })
    })
}


export const deletePatient = id  => dispatch => {  
    axios.delete('http://localhost:4000/users/' + id)
    .then(res => {
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
    })
    .catch(error => console.log(error))
    
}