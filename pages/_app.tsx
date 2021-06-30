import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import PropTypes from "prop-types";
import { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  );
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

// noinspection JSUnusedGlobalSymbols
export default MyApp;
