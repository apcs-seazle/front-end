import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NFTPage() {
  const router = useRouter();
  const query = router.query;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState();

  console.log(`before http://localhost:3030/nft/get/${query.id}`)
  useEffect(() => {
    fetch(`http://localhost:3030/nft/get/${query.id}`)
    .then((res) => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setItem(result);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
      );
    }, []);

    // const useEffect = async () => {
    //   await fetch(`http://localhost:3030/nft/get/${query.id}`)
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       setIsLoaded(true);
    //       setItem(result);
    //     },
    //     (error) => {
    //       setIsLoaded(true);
    //       setError(error);
    //     }
    //     );
    //   }
    console.log(`after http://localhost:3030/nft/get/${query.id}`)
  
    if (item != null) {
      console.log('item not null')
      console.log(`${item.contentUrl}`)
    }
    else
      console.log('item null')

  if (error) {
    console.log("error")
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    console.log("loading")
    return <div>Loading...</div>;
  } else {
    console.log("image")
    console.log(`wtf ?? http://localhost:3030/nft/get/${query.id}`)
    return <div>
      <div>{`http://localhost:3030/nft/get/${query.id}`}</div>
      <div>{item.contentUrl}</div>
    <img src={item.contentUrl} alt="image" />
      </div>
  }
  
}