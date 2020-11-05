import Head from 'next/head'
import firebase from "firebase"
import style from "../styles/signin.module.sass"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClipboardCheck} from "@fortawesome/free-solid-svg-icons"
import {faGoogle} from "@fortawesome/free-brands-svg-icons"
import Button from "../src/components/button"
import { useRouter } from 'next/router'
export default function SignIn(){
  const router = useRouter()
  const provider = new firebase.auth.GoogleAuthProvider();
  const db = firebase.firestore()
  const google =  async () => {
      const data = await firebase.auth().signInWithPopup(provider)
      try{
        if(data){
          let check = false
          const users = db.collection("users")
          users.where("id", "==", data.user.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  if(doc) {
                    check = true
                    localStorage.setItem("token",data.credential.accessToken)
                    localStorage.setItem("uid", data.user.uid)
                    router.push("/")
                  }
                });
                if(!check){
                  db.collection("users").add({
                    username: data.user.displayName,
                    id: data.user.uid
                  })
                  .then(function(docRef) {
                      console.log("Document written with ID: ", docRef.id);
                      localStorage.setItem("token", data.credential.accessToken)
                      localStorage.setItem("uid", data.user.uid)
                      router.push("/")
                  })
                }
            })
        }
      }catch(error){
        console.error(error)
      }
    }
  
  return(
    <div>
      <Head>  
        <title>Sign In</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script src="https://www.gstatic.com/firebasejs/ui/4.6.1/firebase-ui-auth.js"></script>
        <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.6.1/firebase-ui-auth.css" />
      </Head>
      <div className={style.container}>
        <div className={style.card}>
          <div className={style.icon}>
            <FontAwesomeIcon  size="2x" icon={faClipboardCheck} />
          </div>
          <div className={style.title}>Welcome to Kapital To Do</div>
          <div onClick={google} className={style.signButton}>
            <Button text={"Sign in with Google"}>
              <FontAwesomeIcon icon={faGoogle}/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}