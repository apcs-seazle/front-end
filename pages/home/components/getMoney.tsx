import Link from "next/link";

function GetMoney({ address, nft }: any) {
  return (
    <Link href={{ pathname: "./getMoney", query: { id: address } }} 
    className="block text-gray-700 rounded font-semibold hover:text-sky-600 hover:font-bold"
    >
      Get Money
    </Link>
  );
}

export default GetMoney;
