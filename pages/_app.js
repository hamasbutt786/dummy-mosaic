import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
import "../styles/globals.css";
import Head from "next/head";
import Auth from "../components/middlewares/Auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
function MyApp({ Component, pageProps, session }) {
  return (
    <>
      <Head>
        <title>
          Mosaica | Business Intelligence for Corporate Responsibility
        </title>
        <link
          rel="icon"
          href="https://tuk-cdn.s3.amazonaws.com/can-uploader/Logo%20mosaic.png"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Provider store={store}>
        <SessionProvider session={session}>
          {/*<Auth pageProps={pageProps}>*/}
          <ThemeProvider defaultTheme={"emerald"}>
            <Component {...pageProps} />
          </ThemeProvider>
          {/*</Auth>*/}
        </SessionProvider>
      </Provider>
    </>
  );
}

export default MyApp;
