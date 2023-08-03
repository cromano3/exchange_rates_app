import React from 'react';
import Chart from 'chart.js/auto';

import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';

import Dropdown from './Dropdown';
import Tab from './Tab';

import './Home.css';

 function CurrencyResult(props){
  const {
    amount,
    fromCur,
    toCur,
    result,
  } = props;

  return (
    <div className="row">
      <div className="col-12 text-center">
        <p><span className="from-result">{amount} {fromCur} = </span><span className="to-result">{result} {toCur}</span></p>
      </div>
    </div>
  )
}

class ExchangeRate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1.00,
      fromCur: 'USD',
      toCur: 'EUR',
      result: 1.00,
      error: '',
      submitted: false,
    };

    this.chartRef = React.createRef();

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleSwap = this.handleSwap.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.getHistoricalRates = this.getHistoricalRates.bind(this);
    this.buildChart = this.buildChart.bind(this);
  }

  getHistoricalRates(base, quote) {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${quote}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(rate => rate[quote]);
        const chartLabel = `${base}/${quote}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
      .catch(error => console.error(error.message));
  }

  buildChart(labels, data, label) {
    const chartRef = this.chartRef.current.getContext("2d");
    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }
    this.chart = new Chart(this.chartRef.current.getContext("2d"), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          }
        ]
      },
      options: {
        responsive: true,
      }
    })
  }

  handleTabClick(event) {
    this.setState({ amount: event.target.value, submitted: false });
  }

  handleAmountChange(event) {
    this.setState({ amount: event.target.value, submitted: false });
  }

  handleSwap(event) {

    const { fromCur, toCur } = this.state;
    this.setState({ toCur: fromCur, fromCur: toCur, submitted: false });

  }

  handleDropdownChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value, submitted: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { fromCur, toCur, amount } = this.state;

    if (!fromCur || !toCur || fromCur == toCur) {
      return;
    }

    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data.Response === 'False') {
          throw new Error(data.Error);
        }
        console.log(data);
        this.setState({ result: data.rates[toCur], error: '', submitted: true });
        this.getHistoricalRates(fromCur, toCur);
      })
      .catch((error) => {
        this.setState({ error: error.message, submitted: true });
        console.log(error);
      })

    
  }

  render() {
    const { amount, fromCur, toCur, error, result, submitted } = this.state;

    return (
      <div className='container page-container'>
        <h1 className='main-title text-center'>Romano's Rates: The Most Trusted For Currency Conversions</h1>
        <div className="container main-box">
        <div className="main-box-content">
          <div className='row'>
          
            <Tab title='Convert' active= {true}></Tab>
           
            
            <Tab title='Rates' active= {false}></Tab>
            
          </div>
            <div className="main-box-sub-content">
            <form onSubmit={this.handleSubmit} className="form-inline my-4">
              <div className='row'>

                <div className='col-12 col-lg-3 text-center'>
                  <input type="number" className="form-control" value={amount} onChange={this.handleAmountChange}/>
                </div>

                <div className='col-12 col-m-5 col-lg-3 text-center'>
                  <Dropdown name="fromCur" selection={fromCur} onChange={this.handleDropdownChange}/>
                </div>

                <div className='col-12 col-m-2 col-lg-1 text-center'>
                  <button type="button" className="btn btn-outline-primary btn-swap" onClick={this.handleSwap}>Swap</button>
                </div>

                <div className='col-12 col-m-5 col-lg-3 text-center'>
                  <Dropdown name="toCur" selection={toCur} onChange={this.handleDropdownChange}/> 
                </div>
                <div className='col-12 col-lg-2 text-center'>
                  <button type="submit" className="btn btn-primary">Convert</button>
                </div>

              </div>
            </form>
            </div>
            {(() => {
              if(submitted){
                if (error) {
                  return error;
                }
                return (
                  <div>
                    <CurrencyResult fromCur={fromCur} amount={amount} toCur={toCur} result={result}/> 
                    <canvas ref={this.chartRef} />
                  </div>
                );
              }
              
            })()}
            
          </div>
         </div>
      </div>
    )
  }
}

export default ExchangeRate;