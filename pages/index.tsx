import Head from "next/head";
import HomePage from "./homepage";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Seazle</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      </Head>
      <HomePage/>
    </div>
  )
}
