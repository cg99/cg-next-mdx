import { Html, Head, Main, NextScript } from 'next/document';
import { useContext } from 'react';

export default function Document() {

    return (
        <Html className="dark" >
            <Head>
                <meta name="description" content="unique projects with source code" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <body className="bg-slate-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100">
                <Main />
                <NextScript />
            </body>
        </Html >
    );
}
