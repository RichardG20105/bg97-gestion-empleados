import Layout from "@/components/layout/Layout";
import "../styles/scss/styles.scss";
import { AppProps } from "next/app";
import { AuthProvider } from "@/Context/AuthContext";

function MyApp ({Component, pageProps}: AppProps){
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp;