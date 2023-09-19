import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
const App: React.FC = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>포트폴리오</title>
      </Head>
      <div>공통메뉴</div>
      <Component {...pageProps} />
    </>
  );
};

export default App;