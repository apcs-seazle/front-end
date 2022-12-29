import { useState } from "react";

export default function TrendingTop() {
    const [isTrendingOrTop, setTrendingOrTop] = useState('trending')
    return (
        <div>
            <div className="flex flex-row space-x-10 ml-40 mt-20">
                <div className={`${isTrendingOrTop=='trending' ? "text-black" : "text-gray-400"} text-2xl font-semibold`}  onClick={()=>setTrendingOrTop('trending')}>
                    Trending
                </div>
                <div className={`${isTrendingOrTop=='top' ? "text-black" : "text-gray-400"} text-2xl font-semibold`}  onClick={()=>setTrendingOrTop('top')}>
                    Top
                </div>
            </div>
            <hr className="my-2 mx-20 h-1 bg-gray-500 border-0"/>
        </div>
    )
}