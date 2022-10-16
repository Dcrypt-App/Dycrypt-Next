import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Header from "../components/navigation/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="container">
        <Header title="D'crypt" isCentered />
        <Component {...pageProps} />
      </main>
  );
}

export default MyApp;
