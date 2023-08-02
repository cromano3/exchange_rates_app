import React from 'react';
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

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      currency: 'USD',
      data: null,
      submitted: false,
      error: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.fetchCurrencyData = this.fetchCurrencyData.bind(this);
  }

  componentDidMount () {

    const currency = this.props.match.params.currency;

    if(currency){
      this.setState({currency});
      this.fetchCurrencyData(currency);
    }
    
  }

  handleDropdownChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value, submitted: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { currency } = this.state;
    this.fetchCurrencyData(currency);
  } 

  fetchCurrencyData(currency) {

    if (!currency) {
      return;
    }

    fetch(`https://api.frankfurter.app/latest?from=${currency}`)
       .then(checkStatus)
       .then(json)
       .then((data) => {
          console.log(data);
          this.setState({ data: data, error: '', submitted: true, title: currency });
        })
      .catch((error) => {
        this.setState({ error: error.message, submitted: true });
        console.log(error);
      })
  }

  

  render() {

    const { currency, data, submitted, error, title } = this.state;

    return(
      <div className='container page-container'>
        <h1 className='main-title text-center'>{title ? `Rates for ${title}` : 'Check The Rates For A Currency'}</h1>
        <div className="container main-box">
        <div className="main-box-content">
        <div className='row'>
          <Tab title='Convert' active= {false}></Tab>
          <Tab title='Rates' active= {true}></Tab>
        </div>
          <div className="main-box-sub-content">
            <form onSubmit={this.handleSubmit} className="form-inline my-4">
              <div className='row'>

              <div className='col-12 col-lg-6 text-center'>
                <Dropdown name="currency" selection={currency} onChange={this.handleDropdownChange}/>
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
}

export default Chart;