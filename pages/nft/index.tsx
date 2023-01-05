import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../home/components/loading";
import NavigationBar from "../../components/navigationbar";
import contract from "../../helpers/connectMetamask/abicontract";
import web3 from "../../helpers/connectMetamask/web3";
import { HOST } from "../../utils/constant";

declare let window: any;

export default function NFTPage() {
  const router = useRouter();
  const query = router.query;

  const [error, setError] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState<any>();

  const [showModal, setShowModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalFail, setModalFail] = useState(false);

  useEffect(() => {
    fetch(`${HOST}/nft/get/${query.id}`)
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

  const buyNFT = async () => {
    if (typeof window.ethereum != "undefined") {
      if (global.defaultAccount != "") {
        try {
          var valueInWei = await web3.utils
            .toWei(item.price.toString())
            .toString();
          await contract()
            .methods.buyNFT(item.idNFT.toString(), valueInWei)
            .send({
              from: global.defaultAccount,
              value: valueInWei,
            });
          setModalSuccess(true);
          setShowModal(false);
          setModalFail(false);
        } catch (err) {
          setModalSuccess(false);
          setModalFail(true);
          setShowModal(false);
        }
      }
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loading />;
  } else {
    const fileUrl = (item.contentUrl as string) ?? "";

    return (
      <div>
        <NavigationBar />
        <img className="inline-block" src={fileUrl} alt="image" />
        <button
          onClick={() => {
            setShowModal(true);
          }}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Buy Now
        </button>
        {showModal == true && (
          <div>
            <div className="grid place-items-center bg-neutral-700 bg-opacity-40 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold pt-2 pl-4 text-gray-900 dark:text-white">
                    Buy NFT
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Name: {item.name}
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    ID: {item.idNFT}
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Description: {item.description}
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    OwnerAddress: {item.ownerAddress}
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Price: {item.price}
                  </p>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    onClick={buyNFT}
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                    }}
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {modalSuccess == true && (
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
                    Payment successful
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <p className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    THANK YOU
                  </p>
                </div>
                <div className="flex items-center p-6 space-x-2  rounded-b dark:border-gray-600">
                  <button
                    onClick={() => {
                      setModalSuccess(false);
                    }}
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Let's go
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {modalFail == true && (
          <div>
            <div className="grid place-items-center bg-neutral-700 bg-opacity-40 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-96 grid place-items-center">
                <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/6659/6659895.png"
                    className="p-1 rounded h-11 w-11"
                    alt="..."
                  />
                  <h3 className="text-xl font-semibold pt-2 pl-4 text-gray-900 dark:text-white">
                    Fail Payment
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <p className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    TRY AGAIN
                  </p>
                </div>
                <div className="flex items-center p-6 space-x-2  rounded-b dark:border-gray-600">
                  <button
                    onClick={() => {
                      setModalFail(false);
                    }}
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Let's go
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
