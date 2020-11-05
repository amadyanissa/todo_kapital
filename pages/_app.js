import '../styles/globals.css'
import firebaseConfig from "../config/firebase"
import firebase from "firebase"
import Head from "next/head";
import { Provider } from "react-redux"
import store from "../src/redux/store"

function MyApp({ Component, pageProps }) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore()
  }
  // require("firebase/firestore");

  return (
    <>
    <Provider store={store}>
      <Head>
      <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-firestore.js"></script>
      </Head>
      <Component {...pageProps} />
    </Provider>
    </>

  )
}

export default MyApp
