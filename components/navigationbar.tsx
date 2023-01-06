/*
  Not responsive
*/

import { KeyboardEvent, useState } from "react";
import WalletConnect from "../pages/home/components/walletConnect";
import Link from "next/link";
import Account from "../pages/home/components/account";

const NavigationBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isDropOpen, setDrop] = useState({'explore': false, 'profile': false,'wallet': false});

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
      <nav className = "p-2 bg-gradient-to-r from-cyan-500 via-teal-300 to-rose-300">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          {/* Logo */}
          <a href="https://client-seazle.vercel.app/" className="flex items-center">
            <img src="https://i.imgur.com/98gX8Ky.png" className="h-6 mr-3 sm:h-9"/>
            <span className="self-center text-3xl font-semibold whitespace-nowrap text-slate-800">Seazle</span>
          </a>
          {/* Search bar */}
          <div className="flex items-center relative mx-auto text-gray-600 w-1/2">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={`${isSearching ? 2.5 : 1.5}`} stroke="currentColor" className={`w-6 h-6 ${isSearching ? "text-blue-600" : "text-gray-700"}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <input id="search_box" onKeyDown={handleSearchBox} className="focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ml-2 border-gray-200 bg-white h-10 px-5 rounded-2xl text-sm w-full"
              type="search" name="search" placeholder="Search items, collections, and accounts"
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={()=> setIsSearching(true)}
              onBlur={()=> setIsSearching(false)}
              value={searchValue}/>
          </div>
          {/* Menu Items */}
          <div className="flex space-x-6">
            {/* By text */}
            <div onMouseEnter={handleClickDropdown.bind(null, 'explore')}
                 onMouseLeave={handleClickDropdown.bind(null, 'explore')}>
              <a href="#" className="block text-gray-700 rounded font-semibold hover:text-sky-600 hover:font-bold">Create</a>
            </div>
          
            {/* By icon */}
            {/* Account */}
            <Account address={"profile"} nft={"1"}/>
            {/* Wallet */}
            <WalletConnect/>
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

export default NavigationBar