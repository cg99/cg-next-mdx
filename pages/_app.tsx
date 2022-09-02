import type { AppProps } from 'next/app';
import { useContext, useState } from 'react';
import { AppProvider } from '../context/AppContext';
import '../styles/globals.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider >)
}

export default MyApp
