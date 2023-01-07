import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavigationBar from "../../components/navigationbar";
import { HOST } from "../../utils/constant";
import CardNFT from "../home/components/card-nfts";
import Loading from "../home/components/loading";

export default function FindPage(query: any) {
  const router = useRouter();
  const argument = router.query;
  const searchValue = argument.query;

  const [error, setError] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItem] = useState<any>([]);
  // console.log("before", items);

  console.log("search", searchValue);
  useEffect(() => {
    // console.log("call use effect");
    // if (searchValue == undefined) return;
    if (searchValue == undefined) return;
    axios.post(`${HOST}/nft/search/${searchValue}`).then((res) => {
      console.log(res);
      if (res.data.length == 0) return;
      setItem(res.data);
    });
    setIsLoaded(true);
  }, [searchValue]);

  console.log("items ", items);
  //   console.log(items.length);

  if (!isLoaded) return <Loading />;
  return (
    <div>
      <NavigationBar searchQuery={searchValue} />
      {items.length == 0 ? (
        <div>Item not found</div>
      ) : (
        <div className="flex items-center">
          <ul id="all" className="flex flex-wrap mt-5 ">
            {items.map((item: any) => (
              <li key={item._id} className="display:inline-block px-2">
                <CardNFT id={item._id} nft={item} />
              </li>
            ))}
          </ul>
          {/* {items.length} */}
        </div>
      )}
    </div>
  );
}
