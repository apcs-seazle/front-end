import React, { useEffect, useState } from "react";
import { HOST } from "../../utils/constant";
import NavigationBar from "../../components/navigationbar";
import router, { useRouter } from "next/router";
import Loading from "../home/components/loading";
import axios from "axios";

export default function Sell() {
  const router = useRouter();
  const query = router.query;

  const [price, setPrice] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);
  const[item, setItem] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (query.id == undefined) return;
    fetch(`${HOST}/nftCreate/get/${query.id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItem(result);
          console.log(result.contentUrl);
        },
        (error) => {
          setIsLoaded(true);
        }
      );
  }, [query.id]);

  const onSubmit = () => {
    axios
      .put(`${HOST}/nft/create`, { 
        name: item.name,
      contentUrl: item.contentUrl,
      description: item.description,
      idNFT: item.idNFT,
      ownerAddress: item.ownerAddress,
      price: price
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => console.log(error));

    axios
      .delete(`${HOST}/nftCreate/delete/${item.idNFT}`)
      .then((res) => {
      })
      .catch((error) => console.log(error));
    
  };

  if (!isLoaded) {
    return <Loading />;
  }
  else{
  return (
    <div className="h-screen bg-[#F0F9FF]">
      <NavigationBar />
      <div className="flex flex-col h-full w-full px-16 py-8 space-y-12 space-y-4 md:space-y-6">
        <div className="flex flex-row w-full items-center">
          <img
            src= {item.contentUrl}
            alt="image"
            className="h-72 w-72 basis-1/2"
          />
          <label className="basis-1/2 w-full block mb-2 text-xl font-normal text-gray-900 dark:text-white">
            Price
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Set price"
              onChange={(ev) => {
                setPrice((ev.target as any).value);
              }}
            />
          </label>
        </div>
        <div className="flex flex-col w-full h-full">
          <div className="w-full">
            <label className="block mb-2 text-xl font-normal text-gray-900 dark:text-white">
              Name
            </label>

            <p className="h-10 justify-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-2/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {item.name}
            </p>
          </div>

          <div>
            <label className="block mb-2 text-xl font-normal text-gray-900 dark:text-white">
              Description
            </label>

            <p className="overflow-y-auto h-32 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {item.description}
            </p>
          </div>
        </div>
      </div>
      <button
        className="bg-blue-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        onClick={onSubmit}
      >
        Sell NFT
      </button>
      {success && (
        <div>
          <div className="grid place-items-center bg-neutral-700 bg-opacity-40 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-96 grid place-items-center">
              <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                  className="p-1 rounded h-11 w-11"
                  alt="..."
                />

                <h3 className="text-xl font-semibold pt-2 pl-4 text-gray-900 dark:text-white">
                  Sell NFT successfully!
                </h3>
              </div>

              <div className="flex items-center p-6 space-x-2  rounded-b dark:border-gray-600">
                <button
                  onClick={() => {
                    setSuccess(false);
                  }}
                  data-modal-toggle="defaultModal"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
                }}
