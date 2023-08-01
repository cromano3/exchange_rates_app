import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';

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
        <p>{amount} {fromCur} = </p>
        <p>{result} {toCur}</p>
      </div>
    </div>
  )
}

function Dropdown(props){
  const {
    name,
    selection,
    onChange,
  } = props;
  return(
    <div className='col-12 col-sm-6 col-lg-3 text-center'>
      <select className = "form-control" name={name} value={selection} onChange={onChange}>
        <option value="USD">USD - US Dollar</option>
        <option value="AUD">AUD - Australian Dollar</option>
        <option value="BGN">BGN - Bulgarian Lev</option>
        <option value="BRL">BRL - Brazilian Real</option>
        <option value="CAD">CAD - Canadian Dollar</option>
        <option value="CHF">CHF - Swiss Franc</option>
        <option value="CNY">CNY - Chinese Yuan Renmibi</option>
        <option value="CZK">CZK - Czech Koruna</option>
        <option value="DKK">DKK - Danish Krone</option>
        <option value="EUR">EUR - Euro</option>
        <option value="GBP">GBP - British Pound</option>
        <option value="HKD">HKD - Hong Kong Dollar</option>
        <option value="HUF">HUF - Hungarian Forint</option>
        <option value="IDR">IDR - Indonesian Rupiah</option>
        <option value="ILS">ILS - Israeli Shekel</option>
        <option value="INR">INR - Indian Rupee</option>
        <option value="ISK">ISK - Icelandic Krona</option>
        <option value="JPY">JPY - Japanese Yen</option>
        <option value="KRW">KRW - South Korean Won</option>
        <option value="MXN">MXN - Mexican Peso</option>
        <option value="MYR">MYR - Malaysian Ringgit</option>
        <option value="NOK">NOK - Norwegian Krone</option>
        <option value="NZD">NZD - New Zealand Dollar</option>
        <option value="PHP">PHP - Philippine Peso</option>
        <option value="PLN">PLN - Polish Zloty</option>
        <option value="RON">RON - Romanian Leu</option>
        <option value="RUB">RUB - Russian Ruble</option>
        <option value="SEK">SEK - Swedish Krona</option>
        <option value="SGD">SGD - Singapore Dollar</option>
        <option value="THB">THB - Thai Baht</option>
        <option value="TRY">TRY - Turkish Lira</option>
        <option value="ZAR">ZAR - South African Rand</option>
      </select>
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

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAmountChange(event) {
    this.setState({ amount: event.target.value, submitted: false });
  }

  handleDropdownChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value, submitted: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { fromCur, toCur, amount } = this.state;

    if (!fromCur) {
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
        <h1 className='main-title text-center'>Romano's Rates The Most Trusted For Currency Conversions</h1>
        <div className="container main-box">
        <div className="main-box-content">
            <form onSubmit={this.handleSubmit} className="form-inline my-4">
              <div className='row'>
                <div className='col-12 col-lg-3 text-center'>
                  <input type="number" className="form-control" value={amount} onChange={this.handleAmountChange}/>
                </div>
                <Dropdown name="fromCur" selection={fromCur} onChange={this.handleDropdownChange}/>
                <Dropdown name="toCur" selection={toCur} onChange={this.handleDropdownChange}/> 
                <div className='col-12 col-lg-3 text-center'>
                  <button type="submit" className="btn btn-primary">Convert</button>
                </div>
              </div>
            </form>
            {(() => {
              if(submitted){
                if (error) {
                  return error;
                }
                return <CurrencyResult fromCur={fromCur} amount={amount} toCur={toCur} result={result}/>;
              }
              
            })()}
          </div>
         </div>
      </div>
    )
  }
}

export default ExchangeRate;