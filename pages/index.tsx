import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Nextauth version 4</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello Nextauth v4</h1>
    </div>
  );
};

export default Home;
