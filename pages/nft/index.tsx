/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../home/components/loading";
import NavigationBar from "../../components/navigationbar";
import contract from "../../helpers/connectMetamask/abicontract";
import web3 from "../../helpers/connectMetamask/web3";
import { HOST } from "../../utils/constant";
import { result } from "lodash";
import Link from "next/link";
import axios from "axios";

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

  console.log(query.id);
  useEffect(() => {
    if (query.id == undefined) return;
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

          axios
          .delete(`${HOST}/nft/delete/${item.idNFT}`)
          .then((res) => {
          })
          .catch((error) => console.log(error));
          
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
      <div className="  ">
        <NavigationBar />
        <div className="flex flex-row gap-5 px-5 py-5">
          <div className="flex flex-col w-2/5 border border-gray-200 rounded-2xl">
            <div className="font-bold text-lg text-right pr-3">
              <p className="text-gray-400 dark:text-gray-400 inline-block">1</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#8A939B"
                className="w-6 h-6 ml-2 inline-block my-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <img
              src={fileUrl}
              alt="image"
              className="h-full w-full border-t border-gray-200 rounded-b-2xl"
            />
          </div>
          <span className="block w-3/5">
            <div className="flex flex-col">
              <p className="text-[1.5rem] leading-relaxed text-sky-600 mt-2">
                Collection name
              </p>

              <p className="text-black font-bold text-[3rem] mt-3 inline-block">
                {item.name} #{item.idNFT}
              </p>
              <div className="flex flex-row">
                <p className="text-black text-[1.3rem] inline-block">
                  Owned by
                  {
                    <Link
                      href={{ pathname: "./create" }}
                      className="text-sky-600"
                    >
                      {" "}
                      Dung De Quy
                    </Link>
                  }
                </p>
                <div className="font-bold text-[1.3rem] pl-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#8A939B"
                    className="w-8 h-8 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-gray-400 dark:text-gray-400 font-medium pl-2 inline-block text-center">
                    3
                  </p>
                </div>
                <div className="font-bold text-[1.3rem] pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#8A939B"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#8A939B"
                    className="w-8 h-8 ml-2 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>

                  <p className="text-gray-400 dark:text-gray-400 font-medium pl-2 inline-block text-center">
                    3
                  </p>
                </div>
              </div>
              <div className="mt-2 flex flex-col border-2 border-[#8A939B] rounded-xl">
                <div className="font-bold text-[1.5rem] text-left pl-3 py-4 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="black"
                    className="w-9 h-9 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    />
                  </svg>

                  <p className="text-black font-medium dark:text-white inline-block pl-5">
                    Description
                  </p>
                </div>
                <div className="h-96 flex-2 overflow-y-auto border-t-2 border-[#8A939B] px-3 py-3 font-normal text-black text-[1.3rem] text-left">
                  <p className="">
                    By
                    {
                      <Link
                        href={{ pathname: "./create" }}
                        className="text-sky-600 font-medium"
                      >
                        {" "}
                        Dung De Quy
                      </Link>
                    }
                    ,
                  </p>
                  <p className="pt-3">{item.description}</p>
                </div>

                <div className="flex flex-row border-t-2 border-[#8A939B]">
                  <button
                    onClick={() => {
                      setShowModal(true);
                    }}
                    type="button"
                    className="w-full m-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </span>
        </div>

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
                    <p className="font-bold inline-block">Name:</p>
                    {" " + item.name}
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <p className="font-bold inline-block">ID:</p>
                    {" " + item.idNFT}
                  </p>
                  {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Description: {item.description}
                  </p> */}
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <p className="font-bold inline-block">Owner Address:</p>
                    {" " + item.ownerAddress}
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <p className="font-bold inline-block">Price:</p>
                    {" " + item.price}
                  </p>
                </div>
                <div className="flex justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
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
