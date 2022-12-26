import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NFTPage() {
  const router = useRouter();
  const query = router.query;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState();


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
    }, [query.id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded || item.contentUrl == undefined) {
    return <div>Loading...</div>;
  } else {
    return <div>
      <img src={item.contentUrl} alt="image" />
    </div>
  }
}