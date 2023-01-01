import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../home/components/loading";
import NavigationBar from '../../components/navigationbar';
import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  BriefcaseIcon,
} from "@heroicons/react/24/solid";
import CardNFT from '../home/components/card-nfts';

declare let window: any;
var firstTime = false;
var arrayID : Array<String>=[];

export default function NFTPage() {
  const router = useRouter();
  const query = router.query;

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const[arrayRender, setArrayRender] = useState(Array<String>)

  useEffect(() => {
    fetch(`http://localhost:3030/nft/getNFT/${query.id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
        }
      );

      GetNFT();
  }, []);

  const GetNFT = async () => {
    if(global.defaultAccount == "")
    {
        return;
    }

    if(firstTime == false)
    {
      await Moralis.start({
        apiKey: "HGl0bOLcWkPRRLAmD5xN2JmFTMvTTM0CPanypE2AdILzo2MbN2JaXmzAR5Y1gJ0o",
      });
      firstTime = true
    }
    var address = global.defaultAccount;
    const chain = EvmChain.BSC_TESTNET;
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
       address,
       chain,
    });

    var tmp =response.toJSON();
    var result = Object.entries(tmp);
    var arrayNFT = result[4][1];
    console.log(arrayNFT)
    for (let i = 0; i < arrayNFT.length; i++) {
      if (arrayNFT[i]["token_address"] == global.contractAddress)
      {
          arrayID.push(arrayNFT[i]["token_id"]);
      }
    }
    setArrayRender(arrayID);
    if(arrayID.length != 0)
    {
        // setSelectId(String(arrayID[0]));
    }
  };

    if (!isLoaded)
    {
        return (<Loading/>)
    } 
    else 
    {
      return (
      <div>
        <NavigationBar/>
        <section className="relative block h-[50vh]">
        <div className="absolute top-0 h-full w-full bg-gradient-to-r from-sky-200 to-rose-300 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-80 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                  <div className="relative">
                    <div className="-mt-20 w-40">
                    <img className="w-40 h-40 rounded-full" src="https://media.istockphoto.com/id/1308682666/vector/blue-gradient-soft-background.jpg?s=612x612&w=0&k=20&c=CBSD2BDe2uMi-Zm65ny6KoPKXsTPdk5K8wt_vMIb3Hc=" alt="Rounded avatar"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-8 text-center">
              <div className="mb-5 flex items-center justify-center gap-2">
              <img className="w-10 h-10 mb-1 rounded-full" src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/binance-coin-bnb-icon.png" alt="Rounded avatar"/>
                <Typography variant="h4" color="blue-gray" className="font-semibold">
                  {global.defaultAccount}
                </Typography>
                </div>
                <div className="mb-5 flex items-center justify-center gap-2">
                  <Typography className="font-semibold text-blue-gray-700">
                    Balance: {global.balance} BNB
                  </Typography>
                </div>
                <div className="mb-2 flex items-center  gap-2">
                  <BriefcaseIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography variant="h4" className="font-semibold text-blue-gray-700">
                    NFT in Seazle
                  </Typography>
                </div>
                <div className="flex items-center">
                  <ul id="all" className="grid gap-4 grid-cols-4 ">
                  {items.map((item) => (<li className="display:inline-block px-2"><CardNFT id={item._id} nft={item}/></li>))}
                  </ul>
                </div>
                <div className="mb-2 flex items-center  gap-2">
                  <BriefcaseIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography variant="h4" className="font-semibold text-blue-gray-700">
                    NFT in Metamask
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    )
  }
}