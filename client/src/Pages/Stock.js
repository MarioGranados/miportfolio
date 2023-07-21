import { useEffect, useState } from "react";
import { STOCK_API_KEY } from "../Config/Confg";
import { Chart } from "react-google-charts";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";

export default function Stock() {
  const [symbol, setSymbol] = useState('IBM');
  const [stockData, setStockData] = useState([]);
  const [err, setError] = useState(false);
  const [time, setTime] = useState(60);
  const [days, setDays] = useState(50);
  const [interval, setInterval] = useState('TIME_SERIES_INTRADAY');


  //const URL = `https://www.alphavantage.co/query?function=${interval}&symbol=${symbol}&interval=${time}min&apikey=${STOCK_API_KEY}`;
  const URL = "./data.json";

  async function fetchStockData() {
    let chartInputData = [];
    let arr = [];
    const chartInfo = ["Day", "", "", "", ""];
    chartInputData.push(chartInfo);

    await fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        let day = Object.keys(data[`Time Series (${time}min)`]);
        let results = Object.values(data[`Time Series (${time}min)`]);

        for (let i = 0; i < days; i++) {
          arr.push(day[i]);
          arr.push(Number(results[i]["3. low"]));
          arr.push(Number(results[i]["1. open"]));
          arr.push(Number(results[i]["4. close"]));
          arr.push(Number(results[i]["2. high"]));
          chartInputData.push(arr);
          arr = [];
        }
      });

    if (chartInputData.length > 0) {
      setError(true);
    }
    setStockData(chartInputData);
  }
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

  const options = {
    legend: "",
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
      risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
    },
  };

  useEffect(() => {
    fetchStockData();
  }, [err, interval, time]);

  if (err === false) {
    return (
      <Container>
        <h2>{symbol}</h2>
        <Spinner animation="grow" variant="primary" />
      </Container>
    );
  } else {
    return (
      <>
        <Container>
          <h2>{symbol}</h2>
          <Chart
            chartType="CandlestickChart"
            width="100%"
            height="400px"
            data={stockData}
            options={options}
          />
        </Container>
        <Container>
          <Form className="mt-4">
            <Form.Select aria-label="Default select example" onChange={(e) => setTime(e.target.value)}>
              <option value='60min'>Time: 1hr</option>
              <option value="30min">Time: 30min</option>
              <option value="15min">Time: 15min</option>
              <option value="5min">Time: 5min</option>
              <option value="1min">Time: 1min</option>
            </Form.Select>

            <Form.Select aria-label="Default select example" onChange={(e) => setInterval(e.target.value)}>
              <option value='TIME_SERIES_DAILY'>Daily</option>
              <option value="TIME_SERIES_INTRADAY">Intraday</option>
              <option value="TIME_SERIES_WEEKLY">Weekly</option>
              <option value="TIME_SERIES_MONTHLY">Monthly</option>
            </Form.Select>
          </Form>
        </Container>
      </>
    );
  }
}
