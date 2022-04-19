import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import AddPostForm from "../components/AddPostForm";
import PostsList from "../components/PostsList";

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
      <div className="flex flex-col justify-center py-8 items-center">
        <AddPostForm />
        <PostsList />
      </div>
    </div>
  );
};

export default HomePage;
