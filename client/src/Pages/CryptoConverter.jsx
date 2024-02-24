import React, { useState } from 'react';
import axios from 'axios'
import './CryptoCoverter.css'

function CryptoCoverter() {
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8000/getPrice?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&date=${date}`);
      const data = response.data

      console.log(data);
      
      setPrice(data.price);
      console.log(price);
      setError('');

    } catch (error) {
      console.error(error);
      setPrice('');
      setError('Error fetching data');
    }
  };

  return (
    <div className="App">
      <h1>Cryptocurrency Price Converter</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fromCurrency">From Currency:</label>
        <input 
          type="text" 
          id="fromCurrency" 
          value={fromCurrency} 
          onChange={(e) => setFromCurrency(e.target.value)} 
          required 
        />
        <br />
        <label htmlFor="toCurrency">To Currency:</label>
        <input 
          type="text" 
          id="toCurrency" 
          value={toCurrency} 
          onChange={(e) => setToCurrency(e.target.value)} 
          required 
        />
        <br />
        <label htmlFor="date">Date (DD-MM-YYYY):</label>
        <input 
          type="text" 
          id="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
        <br />
        <button type="submit">Get Price</button>
      </form>

      {error && <p>{error}</p>}
      {price && <h3>Price on {date}: {price}</h3>}
    </div>
  );
}

export default CryptoCoverter;
