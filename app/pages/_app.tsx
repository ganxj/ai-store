import type { AppProps } from 'next/app'
import { ThemeProvider } from '~/lib/theme'
import '../styles/globals.css'
import '../styles/swiper.css'
import React from "react";
import Head from "next/head";

declare global {
    interface Window {
        dataLayer: any[]; // 这里使用 'any' 类型，你也可以根据实际情况使用更具体的类型
    }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
          <ThemeProvider>
              <Component {...pageProps} />
          </ThemeProvider>
      </>
  )
}

export default MyApp
