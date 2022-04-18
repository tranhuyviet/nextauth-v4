import { GetServerSideProps, NextPage } from "next";
import {
  getSession,
  getProviders,
  getCsrfToken,
  ClientSafeProvider,
} from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import ProviderLoginButton from "../components/ProviderLoginButton";
import SignupForm from "../components/SignupForm";

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
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleLoginSignupForm = () => {
    setIsLoginForm((prev) => !prev);
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-[calc(100vh-70px)]">
      <div className="shadow-lg rounded-lg border px-8 pb-8 pt-4 flex flex-col text-center space-y-3">
        <div>
          <Image
            src="/images/meta-logo.png"
            width={70}
            height={70}
            alt="meta logo"
          />
          <p className="-mt-2 tracking-wider">Welcome</p>
        </div>
        {isLoginForm ? (
          <div>
            <LoginForm />
            <p className="mt-2 text-gray-500">
              {`Don't have an account? `}
              <button
                className="font-bold text-blue-600/90"
                onClick={toggleLoginSignupForm}
                type="button"
              >
                Sign Up
              </button>
            </p>
          </div>
        ) : (
          <div>
            <SignupForm />
            <p className="mt-2 text-gray-500">
              {`Have an account already? `}
              <button
                className="font-bold text-blue-600/90"
                onClick={toggleLoginSignupForm}
                type="button"
              >
                Login
              </button>
            </p>
          </div>
        )}

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
