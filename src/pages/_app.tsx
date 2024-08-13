import type { AppProps } from "next/app";
import {Fragment} from "react";
import GlobalStyle from "@/components/style/global-style";


export default function App({ Component, pageProps }: AppProps) {
  return (
      <Fragment>
          <GlobalStyle />
          <Component {...pageProps} />
      </Fragment>
  );
}
