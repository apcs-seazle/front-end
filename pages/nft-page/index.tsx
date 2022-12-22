import { useRouter } from "next/router";

export default function NFTPage() {
  const router = useRouter();
  const query = router.query;
  return <img src={query.nft} alt="image" />;
}