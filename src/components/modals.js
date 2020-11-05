import style from "./modal.module.sass";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react";
import { ButtonNoIcon } from "./button"
import firebase from "firebase"

export default function ModalAdd ({ title, onClose, children }) {
  return (
    <div className={style.container}>
      <div className={style.modal}>
        <div className={style.headerModal}>
          {title}
          <div onClick={() => onClose()} className={style.close}>
            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
          </div>
        </div>
        <div className={style.bodyModal}>
          {children}
        </div>
      </div>
    </div>
  );
};

export function AddForm({onSuccess}) {
  let db = firebase.firestore()
  const [form, setForm] = useState()
  const onSubmit = (e) => {
    e.preventDefault()
    db.collection("todo").add({
      taskName: form.taskName,
      status: false,
      uid: localStorage.getItem("uid"),
    })
    .then(() => {
      onSuccess()
    })
    .catch((err) => console.error(err))
  }
  return(
    <form onSubmit={onSubmit} className={style.form}>
      <div>
        <div className={style.formGroup}>
          <label  htmlFor="task_add">Task</label>
          <input placeholder="Name of your task" onChange={(e) =>setForm({...form, taskName: e.target.value}) } id="task_add" name="task_add" required></input>
        </div>
        <div className={style.submit}>
          <ButtonNoIcon  text="Add Task"/>
        </div>
      </div>
    </form>
  )
}

export function EditForm({todoData ,onSuccess}) {
  let db = firebase.firestore()
  const [form, setForm] = useState(todoData.data)
  const onSubmit = (e) => {
    e.preventDefault()
    db.collection("todo").doc(todoData.id).set({
      taskName: form.taskName,
      status: form.status,
      uid: localStorage.getItem("uid"),
    })
    .then(() => {
      onSuccess()
    })
    .catch((err) => console.error(err))
  }
  return(
    <form onSubmit={onSubmit} className={style.form}>
      <div>
        <div className={style.formGroup}>
          <label  htmlFor="task_add">Task</label>
          <input value={form.taskName} placeholder="Name of your task" onChange={(e) =>setForm({...form, taskName: e.target.value}) } id="task_add" name="task_add" required></input>
        </div>
        <div className={style.submit}>
          <ButtonNoIcon  text="Edit Task"/>
        </div>
      </div>
    </form>
  )
}