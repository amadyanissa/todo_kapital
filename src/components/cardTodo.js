import style from "./cardTodo.module.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export default function CardTodo({todoData, onDelete, onEdit, onClick}) {
  return (
    <div className={style.cardContainer}>
      <div onClick={() => onClick()} className={todoData.data.status ? ` ${style.completed} ${style.head}`: style.head}>
        {todoData.data.status ? 
          <span>Completed</span>  
          : <span>Unfinished</span>
      }

      </div>
        <div className={style.body} >
          <div className={style.task}>{todoData.data.taskName}</div>
          <div className={style.actions}>
            <input onChange={() => onEdit(!todoData.data.status)} type="checkbox" checked={todoData.data.status} />
            <FontAwesomeIcon onClick={() => onDelete()} icon={faTrash} size="sm" />
          </div>
        </div>
    </div>
  )
}