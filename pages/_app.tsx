import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import PropTypes from "prop-types";
import { AppProps } from "next/app";
import Head from "next/head";
import { NotificationContextProvider } from "../store/NotificationContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>My App</title>
          <meta name={"description"} content={"Next JS Events"} />
          <meta
            name={"viewport"}
            content={"initial-scale=1.0, width=device-width"}
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

// noinspection JSUnusedGlobalSymbols
export default MyApp;
