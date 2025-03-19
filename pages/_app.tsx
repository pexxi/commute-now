import * as React from "react";
import Head from "../src/components/Head2";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { SWRConfig } from "swr";
import Layout from "../src/components/Layout2";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const swrOptions = {
  fetcher: (resource: any, init: any) => fetch(resource, init).then((res) => res.json()),
};

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head title="Let's Commute!"></Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          <SWRConfig value={swrOptions}>
            <Component {...pageProps} />
          </SWRConfig>
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}
