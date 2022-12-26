import Link from "next/link";

function CardNFT({id, nft}) {
  return (
    <Link href={{ pathname: "../nft", query: {id: id} }}>
      <div className="relative flex-wrap w-72 h-72 inline-block">
        <img src={nft.contentUrl} alt="" className=" w-72 h-72 bg-center bg-no-repeat rounded-3xl" />
        <div className="w-auto h-12 absolute bottom-8 left-3 right-3 bg-transparent/75 rounded-xl p-1 px-3">
          <div className="text-sm font-bold text-white truncate">{nft.name}</div>
          <div className="text-sm  text-white">Floor: {nft.price} ETH</div>
        </div>
      </div>
    </Link>
  )
}

export default CardNFT