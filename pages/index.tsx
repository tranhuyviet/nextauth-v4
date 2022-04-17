import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session)
    return { redirect: { destination: "/login", permanent: false } };
  return {
    props: {},
  };
};

const HomePage: NextPage = () => {
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

export default HomePage;
