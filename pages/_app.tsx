import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  <meta
    httpEquiv="Content-Security-Policy"
    content="default-src 'self'; script-src 'self' https://apis.google.com;"
  />;
  return <Component {...pageProps} />;
}
