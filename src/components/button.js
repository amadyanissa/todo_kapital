import style from "./button.module.sass"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAddressBook} from "@fortawesome/free-solid-svg-icons"

export default function ButtonWithIcon({text, children}){
  return(
    <div className={style.container}>
      <div className={style.icon}>
        {children}
      </div>
      <div>{text}</div>
    </div>
  )
}

export function ButtonNoIcon({text}){
  return(
    <button style={{border: "none", width: "130px"}} className={style.container}>
      <div>{text}</div>
    </button>
  )
}

export function AddButton() {
    return(
      <div className={style.add}>
        <FontAwesomeIcon icon={faAddressBook} />
        <div className={style.text}>Add</div>
      </div>
    )
}