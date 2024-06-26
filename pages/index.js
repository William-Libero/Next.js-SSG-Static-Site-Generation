import HomeInfoDialog from "../components/homeInfoDialog/homeInfoDialog";
import CryptocoinCard from "../components/cryptocoinCard/cryptocoinCard";
import Head from "next/head";
import styles from "./index.module.css";

export async function getStaticProps() {
  const res = await fetch("https://api.coinlore.net/api/tickers/");
  const coins = await res.json();
  console.log("Gerou!", coins.data[8].name);

  if (!res.ok) {
    // If there is a server error, you might want to
    // throw an error instead of returning so that the cache is not updated
    // until the next successful request.
    throw new Error(`Failed to fetch coins, received status ${res.status}`);
  }

  return {
    props: { coins },
    revalidate: 60,
  };
}

export default function Home(props) {
  return (
    <div className={styles.coinsContainer}>
      <Head>
        <title>
          Next.js - Criptocurrencies values - SSG (Static Site Generation)
        </title>
        <meta
          name="description"
          content="Next.js - Criptocurrencies values - SSG (Static Site Generation)"
        />
        <link rel="icon" href="/images/code.png" />
      </Head>
      <HomeInfoDialog />
      <h1 className="text-2xl font-semibold mt-5 mb-10">
        Cryptocurrencies List
      </h1>
      {props.coins.data.map((coin) => {
        return <CryptocoinCard key={coin.id} coin={coin} />;
      })}
    </div>
  );
}
