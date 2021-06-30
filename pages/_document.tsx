import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render(): JSX.Element {
    // noinspection HtmlRequiredTitleElement
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// noinspection JSUnusedGlobalSymbols
export default MyDocument;
