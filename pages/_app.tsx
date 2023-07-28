import Head from "next/head";
import Layout from "@/components/layout/Layout";
import "../styles/scss/styles.scss";
import { AppProps } from "next/app";
import { AuthProvider } from "@/Context/AuthContext";

function MyApp ({Component, pageProps}: AppProps){
  return (
    <>
    <Head>
        <title>Gestión y control de Empleados</title>
        <meta name="description" content="Gestion y control de Empleados"/> 
        <link rel="icon" href="/logo.ico"/>
      </Head>
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
    </>
  )
}

export default MyApp;