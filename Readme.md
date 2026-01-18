# ETH Price Tracker

Real-time Ethereum price tracker with auto-refresh functionality. Built as an async/await practice project.

## Features

- Real-time ETH price in USD
- 24-hour price change percentage with color indicators
- Automatic price refresh every 60 seconds
- Manual refresh button
- Loading states
- Error handling
- Responsive design

## Technologies

- Vanilla JavaScript (ES6+)
- HTML5
- CSS3
- CoinGecko API
- Parcel bundler

## Key Concepts Learned

- Async/await syntax
- Fetch API for HTTP requests
- JSON parsing
- Try/catch error handling
- DOM manipulation
- Event listeners
- setInterval for auto-refresh
- Number formatting (toLocaleString, toFixed)
- CSS class manipulation for state management

## Installation
  bash
npm install
npm run dev


## Project Structure

eth-price-tracker/
├── index.html
├── style.css
├── app.js
├── package.json
├── README.md
└── .gitignore


## API

This project uses the CoinGecko API to fetch real-time Ethereum price data:
- Endpoint: `https://api.coingecko.com/api/v3/simple/price`
- No authentication required
- Free tier available

## Author

**BokaBlock (Armando)**  
GitHub: https://github.com/BokaBlock

