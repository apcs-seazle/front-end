import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const query = router.query;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState();

  useEffect(() => {
    fetch(`http://localhost:3030/nft/get/${query._id}`)
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

  if (error)
  {
    return <div>Error: {error.message}</div>;
  } 
  else if (!isLoaded)
  {
    return (<div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-r outline-none focus:outline-none">
                <div className="relative p-6 flex-auto items-center">
                  <p className="text-1xl font-semibold whitespace-nowrap dark:text-white">LOADING...</p>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>)
  } 
  else 
  {
    return (
    <div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png" alt="image" />
      <img src={items.contentUrl} alt="image" />
    </div>
  )
  }
}
