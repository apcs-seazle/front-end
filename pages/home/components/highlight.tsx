import { useEffect, useState } from "react";
import CardNFT from "./card-nfts";
import Loading from "./loading";

export default function Highlight() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/nft/get-all")
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

	let slideRight = function () {
    var container = document.getElementById('all');
    sideScroll(container,'right',8,1000,50);
	};

	let slideLeft = function () {
    var container = document.getElementById('all');
    sideScroll(container,'left',8,1000,50);
	};


  
	function sideScroll(element,direction,speed,distance,step){
	let scrollAmount = 0;
	var slideTimer = setInterval(function(){
    if(direction == 'left'){
      element.scrollLeft -= step;
		} else {
      element.scrollLeft += step;
		}
		scrollAmount += step;
		if(scrollAmount >= distance){
      window.clearInterval(slideTimer);
		}
	}, speed);
}

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loading/>;
  } else {
    return (
      <div>  
        <div className="text-center text-5xl font-bold py-10">
          Explore, collect, sell and more
        </div>
        <div className="flex items-center">
          <div className="absolute z-30 w-12 h-12 left-20">
          <button className="w-12 h-12 rounded-full bg-white border-2 border-blue-500" onClick={slideLeft}>
            <i className="fa-solid fa-caret-left text-2xl text-cyan-600"></i>
          </button>
          </div>

          <ul id="all" className="flex overflow-x-auto scrollbar-hide whitespace-nowrap no-scrollbar mx-36">
          {items.map((item) => (<li className="display:inline-block px-2"><CardNFT id={item._id} nft={item}/></li>))}
          </ul>

          <div className="absolute z-30 w-12 h-12 right-20">
          <button className="w-12 h-12 rounded-full bg-white border-2 border-blue-500" onClick={slideRight}>
            <i className="fa-solid fa-caret-right text-2xl text-cyan-600"></i>
          </button>
          </div>
        </div>
      </div>
      )
  }
}