import "@tamagui/core/reset.css";
import "@tamagui/font-inter/css/400.css";
import "@tamagui/font-inter/css/700.css";

import { NextThemeProvider, useRootTheme } from "@tamagui/next-theme";
import { Provider } from "app/provider";
import { trpc } from "app/utils/trpc.web";
import Head from "next/head";
import "raf/polyfill";
import React from "react";
import type { SolitoAppProps } from "solito";

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Universal Example</title>
        <meta name="description" content="Tamagui, Solito, Expo & Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useRootTheme();

  return (
    <NextThemeProvider onChangeTheme={setTheme}>
      <Provider disableRootThemeClass defaultTheme={theme}>
        {children}
      </Provider>
    </NextThemeProvider>
  );
}

export default trpc.withTRPC(MyApp);
