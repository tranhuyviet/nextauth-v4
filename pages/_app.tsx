import "../styles/tailwind.css";
import axios from "axios";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";

// axios seting
const url =
  process.env.NODE_ENV === "production"
    ? "https://nextauth-v4.vercel.app/api"
    : "http://localhost:3000/api";
axios.defaults.baseURL = url;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
