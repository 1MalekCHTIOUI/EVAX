import React from "react"; 
import ReactDOM from "react-dom"; 
import App from "./App";


import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

//SBAdmin2 Style
import './styles/scss/sb-admin-2.scss';

import * as serviceWorker from './serviceWorker';
ReactDOM.render(<App />, document.getElementById("root") ); 