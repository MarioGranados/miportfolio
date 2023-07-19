import React, { useState } from "react";
import { useEffect } from "react";
import { STOCK_API_KEY } from "../Config/Confg";
import { Bar } from 'react-chartjs-2';

export default function Stock() {
  const [symbol, setSymbol] = useState("IBM");
  const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${STOCK_API_KEY}`;
  console.log(symbol);

  async function fetchStockData() {
    const response = await fetch(`${URL}`);
    const data = await response.json();
    console.log(data);
  }

// utils/Data.js
const d = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234
  }
];

  useEffect(() => {
    fetchStockData();
  }, [symbol]);

  return (
    <Bar
      data={data}
      height={400}
      width={600}
      options={{
        maintainAspectRatio: false,
      }}
    />
  );
}
