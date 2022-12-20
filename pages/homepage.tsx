/*
  Not responsive
*/

import { KeyboardEvent, useState } from "react";

const HomePage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isDropOpen, setDrop] = useState({'explore': false, 'profile': false});

  const handleClickDropdown = (val:string) => setDrop({...isDropOpen, [val]: !isDropOpen[val as keyof typeof isDropOpen]})
  // const {explore, profile} = isDropOpen

  function handleSearchBox(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key == "Enter") {
      console.log(searchValue);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className = "p-2 bg-gradient-to-r from-indigo-100 to-rose-200">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          {/* Logo */}
          <a href="http://seazle.io" className="flex items-center">
              <img src="https://media.discordapp.net/attachments/871700441791102996/871701497937809448/unknown.png" className="h-6 mr-3 sm:h-9"/>
              <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Seazle</span>
          </a>
          {/* Search bar */}
          <div className="flex items-center relative mx-auto text-gray-600 w-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="w-5 h-5 text-indigo-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input id="search_box" onKeyDown={handleSearchBox} className="border-2 focus:outline-none focus:border-cyan-400 ml-2 border-gray-200 bg-white h-10 px-5 rounded-2xl text-sm w-full"
              type="search" name="search" placeholder="Search items, collections, and accounts"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}/>
          </div>
          {/* Menu Items */}
          <div className="flex space-x-6">
            {/* By text */}
            <div onMouseEnter={handleClickDropdown.bind(null, 'explore')}
                 onMouseLeave={handleClickDropdown.bind(null, 'explore')}>
              <a href="#" className="block text-gray-700 rounded font-semibold hover:text-sky-600 hover:font-bold">Explore</a>
              <div id="dropdown" className={`absolute ${isDropOpen['explore'] ? "block" : "hidden"}`}>
                <ul className="mt-2 shadow-pink-300 shadow w-40 bg-white rounded divide-y divide-white">
                  <li><a href="#" className="flex items-center py-1 px-2 text-gray-700 hover:bg-gray-100 hover:text-sky-400 hover:font-bold"><i className="fa-solid fa-bars pl-1 absolute"></i> <div className="pl-10">All NFTs</div></a></li>
                  <li><a href="#" className="flex items-center py-1 px-2 text-gray-700 hover:bg-gray-100 hover:text-sky-400 hover:font-bold"><i className="fa-solid fa-futbol pl-1 absolute"></i> <div className="pl-10">Sports</div></a></li>
                  <li><a href="#" className="flex items-center py-1 px-2 text-gray-700 hover:bg-gray-100 hover:text-sky-400 hover:font-bold"><i className="fa-solid fa-dice-d6 pl-1 absolute"></i> <div className="pl-10">Games</div></a></li>
                </ul>
              </div>
            </div>
            
            <a href="#" className="block text-gray-700 rounded font-semibold hover:text-sky-600 hover:font-bold">Drops</a>
            <a href="#" className="block text-gray-700 rounded font-semibold hover:text-sky-600 hover:font-bold">Stats</a>
            <a href="#" className="block text-gray-700 rounded font-semibold hover:text-sky-600 hover:font-bold">Resources</a>
            {/* By icon */}
            {/* Account */}
            <div onMouseEnter={handleClickDropdown.bind(null, 'profile')}
                 onMouseLeave={handleClickDropdown.bind(null, 'profile')}>
              <a href="#" className="block text-gray-700 hover:text-sky-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.3} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </a>
              <div id="dropdown" className={`absolute ${isDropOpen['profile'] ? "block" : "hidden"}`}>
                <ul className="mt-2 shadow-pink-300 shadow w-50 bg-white rounded divide-y divide-white">
                  <li><a href="#" className="flex items-center py-1 px-2 text-gray-700 hover:bg-gray-100 hover:text-sky-400 hover:font-bold"><i className="fa-solid fa-user pl-1 absolute"></i><div className="pl-10">Profile</div></a></li>
                  <li><a href="#" className="flex items-center py-1 px-2 text-gray-700 hover:bg-gray-100 hover:text-sky-400 hover:font-bold"><i className="fa-solid fa-star pl-1 absolute"></i> <div className="pl-10">Favorites</div></a></li>
                  <li><a href="#" className="flex items-center py-1 px-2 text-gray-700 hover:bg-gray-100 hover:text-sky-400 hover:font-bold"><i className="fa-solid fa-list pl-1 absolute"></i> <div className="pl-10">Collections</div></a></li>
                </ul>
              </div>
            </div>
            {/* Wallet */}
            <a href="#" className="block text-gray-700 hover:text-sky-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
              </svg>
            </a>
            {/* Cart */}
            <a href="#" className="block text-gray-700 hover:text-sky-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.3} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default HomePage