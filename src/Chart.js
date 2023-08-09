import React, { useEffect } from 'react';
import { useState } from 'react';
import { checkStatus, json } from './utils';

import Dropdown from './Dropdown';
import Tab from './Tab';

import './Chart.css';

function RatesResult(props){
  const {currency, rate} = props;

  return (
    <div className="row">
      <div className="col-12 text-center">
        <p className="result-p"><span className="cur-name">{currency} = </span><span className="cur-value">{rate}</span></p>
      </div>
    </div>
  )
}

const Chart = (props) => {

  const [title, setTitle] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [data, setData] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {

    const URLcurrency = props.match.params.currency;

    if(URLcurrency){
      setCurrency(URLcurrency)
      fetchCurrencyData(URLcurrency);
    }


   }, []);


  const handleDropdownChange = (event) => {
    setCurrency(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCurrencyData(currency);
  } 

  const fetchCurrencyData = (newCurrency) => {

    if (!newCurrency) {
      return;
    }

    fetch(`https://api.frankfurter.app/latest?from=${newCurrency}`)
       .then(checkStatus)
       .then(json)
       .then((newData) => {
          console.log(newData);
          setData(newData);
          setError('');
          setSubmitted(true);
          setTitle(newCurrency);
          props.history.replace(`/chart/${newCurrency}`);
        })
      .catch((thrownError) => {
        setError(thrownError.message);
        setSubmitted(true);
        console.log(thrownError);
      })
  }

  return (
    <div className='container page-container'>
      <h1 className='main-title text-center'>{title ? `Rates for ${title}` : 'Check The Rates For A Currency'}</h1>
      <div className="container main-box">
      <div className="main-box-content">
      <div className='row'>
        <Tab title='Convert' active= {false}></Tab>
        <Tab title='Rates' active= {true}></Tab>
      </div>
        <div className="main-box-sub-content">
          <form onSubmit={handleSubmit} className="form-inline my-4">
            <div className='row'>

            <div className='col-12 col-lg-6 text-center'>
              <Dropdown name="currency" selection={currency} onChange={handleDropdownChange}/>
            </div>

            <div className='col-12 col-lg-6 text-center'>
              <button type="submit" className="btn btn-primary">Check Rates</button>
            </div>

            </div>
          </form>
        </div>
          {(() => {
            if(submitted){
              if (error) {
                return error;
              }
              return Object.entries(data.rates).map(([currency, rate]) => {
                return <RatesResult key = {currency} currency={currency} rate={rate} />;
              })
            }
          })()}
        </div>
        </div>
    </div>
  )
  
}

export default Chart;