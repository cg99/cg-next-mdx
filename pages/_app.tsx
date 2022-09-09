import type { AppProps } from 'next/app';
import { useState } from 'react';
import { ThemeContext } from "../context/theme";
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  )
}

export default MyApp
