import { useEffect, useState } from "react";
import { STOCK_API_KEY } from "../Config/Confg";
import { Chart } from "react-google-charts";

export default function Stock() {
  const [symbol, setSymbol] = useState("IBM");
  const [stockData, setStockData] = useState([]);
  //const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${STOCK_API_KEY}`;
  const URL = "./data.json";

  function fetchStockData() {
    let chartInputData = [];
    let arr = [];

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        let day = Object.keys(data["Time Series (5min)"]);
        let results = Object.values(data["Time Series (5min)"]);

        for (let i = 0; i < day.length; i++) {
          arr.push(day[i]);
          arr.push(Number(results[i]["1. open"]));
          arr.push(Number(results[i]["2. high"]));
          arr.push(Number(results[i]["3. low"]));
          arr.push(Number(results[i]["4. close"]));
          chartInputData.push(arr);
          arr = [];
        }
      });

    setStockData(chartInputData);
    console.log(stockData);
  }

  // if(stockData != null) {
  // const day = Object.keys(stockData["Time Series (60min)"]);
  // const results = Object.values(stockData["Time Series (60min)"]);
  // }

  //Convert Day and results to data format shown below
  // day open close low high
  //  const chartdata = [
  //   ["day", "a", "b", "c", "d"],
  //   ["Mon", 20, 28, 38, 45],
  //   ["Tue", 31, 38, 55, 66],
  //   ["Wed", 50, 55, 77, 80],
  //   ["Thu", 50, 77, 66, 77],
  //   ["Fri", 15, 66, 22, 68],
  // ];
  // const chartInputData = [];
  // let arr = [];
  // const chartInfo = ["Day", "Open Close", "High", "Low", "Close"];
  // chartInputData.push(chartInfo)

  // for(let i = 0; i < day.length; i++) {
  //   arr.push(day[i]);
  //   arr.push(Number(results[i]["1. open"]))
  //   arr.push(Number(results[i]["2. high"]));
  //   arr.push(Number(results[i]["3. low"]));
  //   arr.push(Number(results[i]["4. close"]));
  //   chartInputData.push(arr);
  //   arr = [];
  // }

  // console.log('chart input')
  // console.log(chartInputData)

  const options = {
    legend: "none",
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  if (stockData.length == 0) {
    return <>Loading..</>;
  } else {
    return (
      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="400px"
        // data={data}
        options={options}
      />
    );
  }
}
