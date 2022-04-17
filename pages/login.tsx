import { GetServerSideProps, NextPage } from "next";
import {
  getSession,
  getProviders,
  getCsrfToken,
  ClientSafeProvider,
} from "next-auth/react";
import React from "react";
import ProviderLoginButton from "../components/ProviderLoginButton";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) return { redirect: { destination: "/", permanent: false } };
  return {
    props: {
      providers: await getProviders(),
      session,
      csrfToken: await getCsrfToken(context),
    },
  };
};

const LoginPage: NextPage<{
  providers: ClientSafeProvider;
  csrfToken: string;
}> = ({ providers, csrfToken }) => {
  return (
    <div className="container mx-auto flex justify-center items-center h-[calc(100vh-64px)]">
      <div className="shadow-md border p-8 flex flex-col text-center space-y-2">
        <p>or</p>
        {providers &&
          Object.values(providers).map((provider) => (
            <ProviderLoginButton
              key={provider.id}
              providers={provider}
              csrfToken={csrfToken}
              className="border border-gray-200"
            />
          ))}
      </div>
    </div>
  );
};

export default LoginPage;
