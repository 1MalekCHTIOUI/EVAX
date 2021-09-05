import React, { Component } from 'react';
import Chart from 'chart.js/auto'
import {Pie} from 'react-chartjs-2'

import CardBasic from '../../Cards/Basic';

class ChartDonut extends Component {
    chartRef = React.createRef();
constructor(props){
    super(props)
    this.state = {
        chartData : props.chartData
    }
}

    

    render() {
        return (
            <CardBasic title="Donut Chart">
            <Pie
                data = {this.props.chartData}
                options = {
                    {maintainAspectRatio: false,
                    tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                    },
                    legend: {
                        display: false
                    },
                    cutoutPercentage: 80}
                }
            />
            </CardBasic>
        )
    }
}

export default ChartDonut;