import React, { useEffect, useState } from "react";
import { API_URL } from "../Config/Confg";

export default function HomePage() {
  const [dataDocument, setDataDocument] = useState();
  useEffect(() => {
    fetch(`${API_URL}/all`).then((response) => {
      response.json().then((data) => {
        setDataDocument(data);
      });
    });
  }, []);
  function test(e) {
    e.preventDefault();
    console.log(dataDocument);
  }

  return (
    <>
      <button onClick={test}>test</button>
      Home Page
    </>
  );
}
