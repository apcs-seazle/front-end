import axios from "axios";
import React, { useState } from "react";

export default function Create(this: any) {
  const [content, setContent] = useState({} as any);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const onSubmit = () => {
    const rd = new window.FileReader()
    rd.readAsArrayBuffer(content)
    rd.onloadend = () => {
      axios.put('', {
        name, description: desc,
      })
    };

    const onPickContent = (ev: any) => {
      setContent(ev["target"]["files"][0]);
    };

    return (
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="px-96 py-24 space-y-12">
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Create NFT
            </h1>

            <form className="space-y-4 md:space-y-6">
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
      </section>
    );
  }
