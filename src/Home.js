import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';

 function CurrencyResult(props){
  const {
    amount,
    fromCur,
    toCur,
    result,
  } = props;

  return (
    <div className="row">
      <div className="col-4 col-md-2 col-lg-1 mb-3">
        <p>{amount} {fromCur} = </p>
        <p>{result} {toCur}</p>
      </div>
      {/* <div className="col-8 col-md-10 col-lg-11 mb-3"> */}
        
      {/* </div> */}
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
  <select name={name} value={selection} onChange={onChange}>
    <option value="USD">USD</option>
    <option value="EUR">EUR</option>
    <option value="VEVE">VEVE</option>
  </select>
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
    };

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAmountChange(event) {
    this.setState({ amount: event.target.value });
  }

  handleDropdownChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { fromCur, toCur } = this.state;

    if (!fromCur) {
      return;
    }

    fetch(`https://www.omdbapi.com/?s=${fromCur}&apikey=b7da8d63`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data.Response === 'False') {
          throw new Error(data.Error);
        }

        if (data.Response === 'True' && data.Search) {
          console.log(data);
          this.setState({ results: data.Search, error: '' });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
  }

  render() {
    const { amount, fromCur, toCur, error } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">  
            <form onSubmit={this.handleSubmit} className="form-inline my-4">
              <input
                type="number"
                className="form-control mr-sm-2"
                value={amount}
                onChange={this.handleAmountChange}
              />
              <Dropdown name="fromCur" selection={fromCur} onChange={this.handleDropdownChange}/> 
              <Dropdown name="toCur" selection={toCur} onChange={this.handleDropdownChange}/> 
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {(() => {
              if (error) {
                return error;
              }
              return <CurrencyResult fromCur={fromCur} amount={amount} toCur={toCur}/>;
            })()}
          </div>
        </div>
      </div>
    )
  }
}

export default ExchangeRate;