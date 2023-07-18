import React, { useEffect, useState } from "react";
import { API_URL } from "../Config/Confg";
import StockCards from "../Components/StockCards";
import Cards from "../Components/StockCards";
import Spinner from 'react-bootstrap/Spinner'

export default function HomePage() {
  const [dataDocument, setDataDocument] = useState([]);
  let append = [];
  async function getRequest() {
    const response = await fetch(`${API_URL}/all`);
    const data = await response.json();
    setDataDocument(data);
  }
  useEffect(() => {
    getRequest();
  }, []);

  if (dataDocument.length != 0) {
    return <>
    {dataDocument.map((item, index)=>{
         return <Cards props={item} key={index}/>
     })}
    </>;
  } else {
    return <><Spinner animation="grow" /></>;
  }
}
