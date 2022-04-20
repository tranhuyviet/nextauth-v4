import "../styles/tailwind.css";
import axios from "axios";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import { apiUrl } from "../lib/config";
import fetcher from "../utils/fetcher";
import { store } from "../redux/store";

// axios seting
axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <SWRConfig value={{ fetcher }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
