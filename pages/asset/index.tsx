import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../home/components/loading";
import NavigationBar from "../home/components/navigationbar";

declare let window: any;

export default function NFTPage() {
  const router = useRouter();
  const query = router.query;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
      axios.get(`http://localhost:3030/nft/getNFT/${query.id}`)
      .then(res => {
        const data = res.data;
        console.log(data)
        setIsLoaded(true);
      })
      .catch((error)=> {
        console.log(error);
        setIsLoaded(true);
      });

    },[]);

    if (!isLoaded)
    {
        return (<Loading/>)
    } 
    else 
    {
      return (
      <div>
        <NavigationBar/>
      </div>
    )
  }
}