import React, { useState } from 'react';
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
      const response = await fetch(`https://koinx2.onrender.com/getPrice?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&date=${date}`);
      const data = await response.json();
      
      setPrice(data.price);
      setError('');

      console.log(price);
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
