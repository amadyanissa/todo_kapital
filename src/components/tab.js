import { useState } from "react"
import style from "./tab.module.sass"

export default function Tab({tabBody}){
  const [active, setActive] = useState(0)
  return(
      <div className={style.tabContainer}>
          <div className={style.tabHeads}>
              <div onClick={() => setActive(0)} className={active === 0 ? `${style.headActive} ${style.tabHead}` : style.tabHead} >All Todo</div>
              <div onClick={() => setActive(1)} className={active === 1 ? `${style.headActive} ${style.tabHead}` : style.tabHead} >Completed</div>
          </div>
          <div>
            {tabBody[active].view}
          </div>
      </div>
  )
}