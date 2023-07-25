import Layout from "@/components/layout/Layout";
import "../styles/scss/styles.scss";
import { AppProps } from "next/app";

function MyApp ({Component, pageProps}: AppProps){
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp;