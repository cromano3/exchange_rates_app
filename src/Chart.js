import React from 'react';
import { checkStatus, json } from './utils';

import Dropdown from './Dropdown';

function RatesResult(props){
  const {currency, rate} = props;

  return (
    <div className="row">
      <div className="col-12 text-center">
        <p><span className="from-result">{currency}= </span><span className="to-result">{rate}</span></p>
      </div>
    </div>
  )
}

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.setState({currency});

    if(currency){
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
          if (data.Response === 'False') {
            throw new Error(data.Error);
          }
          if (data.Response === 'True') {
            console.log(data);
            this.setState({ data: data, error: '', submitted: true });
          }
        })
      .catch((error) => {
        this.setState({ error: error.message, submitted: true });
        console.log(error);
      })
  }

  

  render() {

    const { currency, data, submitted, error } = this.state;

    return(
      <div className='container page-container'>
        <h1 className='main-title text-center'>{currency ? `Rates for ${currency}` : 'Check The Rates For A Currency'}</h1>
        <div className="container main-box">
        <div className="main-box-content">
            <form onSubmit={this.handleSubmit} className="form-inline my-4">
              <div className='row'>

                <Dropdown name="currency" selection={currency} onChange={this.handleDropdownChange}/>

                <div className='col-12 col-lg-2 text-center'>
                  <button type="submit" className="btn btn-primary">Check Rates</button>
                </div>

              </div>
            </form>
            {(() => {
              if(submitted){
                if (error) {
                  return error;
                }
                return Object.entries(data.rates).map(([currency, rate]) => {
                  return <RatesResult currency={currency} rate={rate} />;
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