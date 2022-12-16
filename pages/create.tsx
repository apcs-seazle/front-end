import axios from "axios";
import React, { useState } from "react";

export default function Create(this: any) {
  const [content, setContent] = useState({} as any);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const onSubmit = () => {};

  const onPickContent = (ev: any) => {};

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="px-96 py-24 space-y-12">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Create NFT
          </h1>

          <form className="space-y-4 md:space-y-6">
            <div>
              <label className="block mb-2 text-xl font-normal text-gray-900 dark:text-white">
                Image, Video, Audio or 3D Model
              </label>

              <div className="flex items-center justify-center w-72	h-72">
                <label className="rounded-lg items-center justify-center flex flex-col w-full h-full border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>

                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Upload a file
                    </p>
                  </div>

                  <input
                    type="file"
                    className="opacity-0"
                    onChange={(ev) => {
                      setContent((ev.target as HTMLInputElement).files![0]);
                    }}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-xl font-normal text-gray-900 dark:text-white">
                Name
              </label>

              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Item Name"
                onVolumeChange={(ev) => {
                  setName((ev.target as HTMLInputElement).value);
                }}
              />
            </div>

            <div>
              <label className="block mb-2 text-xl font-normal text-gray-900 dark:text-white">
                Description
              </label>

              <textarea
                rows={5}
                placeholder="Datailed description of your NFT"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onVolumeChange={(ev) => {
                  setDesc((ev.target as HTMLInputElement).value);
                }}
              />
            </div>

            <button
              className="bg-blue-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={onSubmit}
            >
              Create NFT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
