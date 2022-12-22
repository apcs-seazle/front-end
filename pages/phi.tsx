import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";

class NFT extends React.Component {
  data: any;

  constructor(props) {
    super(props);
    this.data = props.data;
  }

  render() {
    return <img src={this.data.contentUrl} alt="image" />;
  }
}

function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(0);

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
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <Link
                // as={`/phi1`}
                href={{ pathname: "/phi1", query: { _id: item._id } }}
              >
                <NFT data={item} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MyComponent;
