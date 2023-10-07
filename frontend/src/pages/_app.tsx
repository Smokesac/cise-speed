import "../../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import PopulatedNavBar from "../components/PopulatedNavBar";
import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <NextUIProvider>
            <SessionProvider session={session}>
                <PopulatedNavBar />
                <Component {...pageProps} />
            </SessionProvider>
        </NextUIProvider>
    );
}
export default MyApp;