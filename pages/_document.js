import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script src="/__/firebase/8.0.0/firebase-app.js"></script>
          <script src="/__/firebase/init.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
