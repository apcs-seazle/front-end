/*
  Not responsive
*/

import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";
import NavigationBar from "./components/navigationbar"
import CardNFT from "../../components/card-nfts";
import Loading from "./components/loading";

const HomePage = () => {
  /*
    Fetch NFTs
  */
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/nft/get-all")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loading/>;
  } else {
    return (
      <div>
        <NavigationBar/>
        <ul>{items.map((item) => (<li><CardNFT id={item._id} nft={item}/></li>))}</ul>
      </div>
    );
  }
}

export default HomePage