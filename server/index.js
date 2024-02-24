const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/getPrice', async (req, res) => {
    try {
        const { fromCurrency, toCurrency, date } = req.query
        
        console.log(fromCurrency);
        console.log(toCurrency);
        console.log(date);

        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${fromCurrency}/history?date=${date}`)
        const fromCurrencyPrice = response.data.market_data.current_price[toCurrency]
        
        console.log(fromCurrencyPrice)
        res.json({
            fromCurrency,
            toCurrency,
            date,
            price: fromCurrencyPrice
            // price: 5
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
})
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})