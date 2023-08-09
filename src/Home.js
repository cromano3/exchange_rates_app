import React, { useEffect, useState, useRef } from 'react';

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

const ExchangeRate = (pros) => {

  const [amount, setAmount] = useState(1.00)
  const [fromCur, setFromCur] = useState('USD')
  const [toCur, setToCur] = useState('EUR')
  const [result, setResult] = useState(1.00)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const chartRef = useRef(null);
  const chart = useRef(null);

  const getHistoricalRates = (base, quote) => {
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
        buildChart(chartLabels, chartData, chartLabel);
      })
      .catch(error => console.error(error.message));
  }

  const buildChart = (labels, data, label) => {
    const context = chartRef.current.getContext("2d");
    if (chart.current) {
      chart.current.destroy();
    }
    chart.current = new Chart(context, {
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

  // const handleTabClick = (event) => {
  //   setAmount(event.target.value);
  //   setSubmitted(false);
  // }

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setSubmitted(false);
  }

  const handleSwap = () => {
    setToCur(fromCur);
    setFromCur(toCur);
    setSubmitted(false);
  }

  const handleDropdownChange = (event) => {
    const { name, value } = event.target;

    if(name == 'fromCur'){
      setFromCur(value)
    }

    if(name == 'toCur'){
      setToCur(value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

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
        setResult(data.rates[toCur]);
        setError('');
        setSubmitted(true);

        getHistoricalRates(fromCur, toCur);
      })
      .catch((thrownError) => {
        setError(thrownError.message);
        setSubmitted(true);

        console.log(thrownError);
      })

    
  }

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
            <form onSubmit={handleSubmit} className="form-inline my-4">
              <div className='row'>

                <div className='col-12 col-lg-3 text-center'>
                  <input type="number" className="form-control" value={amount} onChange={handleAmountChange}/>
                </div>

                <div className='col-12 col-m-5 col-lg-3 text-center'>
                  <Dropdown name="fromCur" selection={fromCur} onChange={handleDropdownChange}/>
                </div>

                <div className='col-12 col-m-2 col-lg-1 text-center'>
                  <button type="button" className="btn btn-outline-primary btn-swap" onClick={handleSwap}>Swap</button>
                </div>

                <div className='col-12 col-m-5 col-lg-3 text-center'>
                  <Dropdown name="toCur" selection={toCur} onChange={handleDropdownChange}/> 
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
                    <canvas ref={chartRef} />
                  </div>
                );
              }
              
            })()}
            
          </div>
         </div>
      </div>
    )
  
}

export default ExchangeRate;