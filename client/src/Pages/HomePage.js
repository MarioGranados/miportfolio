import React, { useEffect, useState } from "react";
import { API_URL } from "../Config/Confg";

export default function HomePage() {
  const [dataDocument, setDataDocument] = useState();
  useEffect(() => {
    fetch(`${API_URL}/all`)
      .then((res) => res.json())
      .then((data) => setDataDocument(data));
      console.log(dataDocument)
  }, []);
  return (
    <div>
      HomePage
    </div>
  );
}
