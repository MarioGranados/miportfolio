import React, { useEffect, useState } from "react";
import { API_URL } from "../Config/Confg";
import StockCards from "../Components/StockCards";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
export default function HomePage() {
  const [dataDocument, setDataDocument] = useState([]);
  async function getRequest() {
    const response = await fetch(`${API_URL}/all`);
    const data = await response.json();
    setDataDocument(data);
  }
  useEffect(() => {
    getRequest();
  }, []);

  if (dataDocument.length !== 0) {
    return (
      <>
        {dataDocument.map((item, index) => {
          return <StockCards props={item} key={index} />;
        })}
      </>
    );
  } else {
    return (
      <>
        <Container className="justify-content-center align-items-center d-flex">
          <Spinner animation="grow" variant="primary" />
        </Container>
      </>
    );
  }
}
