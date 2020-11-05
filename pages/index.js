import Head from 'next/head'
import styles from '../styles/Home.module.sass'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import firebase from "firebase"
import { AddButton } from "../src/components/button"
import Modal, {AddForm, EditForm} from "../src/components/modals"
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import {setModalAdd,setModalEdit, setUID, fetchData} from "../src/redux/action"
import Tab from "../src/components/tab"
import CardTodo from "../src/components/cardTodo"
import { getAllTodo, getCompletedTodo, updateTodo, deleteTodo} from "../src/services/firestore"

function ViewList({todo, modalEdit}) {
  const dispatch = useDispatch()
  const fetchStatus = useSelector((state) => state.reducer.fetchData)
  const [index, setIndex] = useState(0)
  return  (
      <div className={styles.todoList}>
        {
          todo.map((todos, i) => {
            return <CardTodo  
            onClick={() =>{
              dispatch(setModalEdit(!modalEdit))
              setIndex(i)
            } }
            onEdit={(status) => {
              updateTodo(todos, status)
              dispatch(fetchData(!fetchStatus))
            }}
            onDelete={() => {
              deleteTodo(todos.id)
              dispatch(fetchData(!fetchStatus))
            }} key={todos.id} todoData={todos} />
          })
        }
        {modalEdit && 
        <Modal title={"Edit"} onClose={() => dispatch(setModalEdit(false))}>
        <EditForm todoData={todo[index]} onSuccess={() => {
            dispatch(setModalEdit(false))
            dispatch(fetchData(!fetchStatus))
          }} />
      </Modal>
      }
    </div>
  )
}

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()
  const modalAdd = useSelector((state) => state.reducer.modalAdd)
  const modalEdit = useSelector((state) => state.reducer.modalEdit)
  const uid = useSelector((state) => state.reducer.uid)
  const fetchStatus = useSelector((state) => state.reducer.fetchData)

  useEffect(() => {
    if(!localStorage.getItem("token") || !localStorage.getItem("uid")){
      router.push("/signIn")
    }else if(localStorage.getItem("uid")){
      dispatch(setUID(localStorage.getItem("uid")))
    }
  },[])

  const [todo, setTodo] = useState([])
  const [completedTodo, setCompletedTodo] = useState([])
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  useEffect(async() => {
    if(uid){
      const data = await getAllTodo(uid)
      setTodo(data)
      const complete = await getCompletedTodo(uid)
      setCompletedTodo(complete)
    }
  },[uid, fetchStatus])


const tabBody = [
    {
      view: (
        <>
        <div className={styles.searchContainer}>
          <div className={styles.search}>
            <input placeholder="Search Task" onChange={async(e) => {
              setSearch(e.target.value)
              const filtered = todo.filter((task) => {
                return task.data.taskName.toLowerCase().includes(search)
              })
              setSearchResult(filtered)
            }} />
          </div>
        </div>
          {
            search ? <ViewList modalEdit={modalEdit} todo={searchResult} />
            : <ViewList modalEdit={modalEdit} todo={todo} />
          }
        </>
      )
    },
    {
      view: (
        <ViewList modalEdit={modalEdit} todo={completedTodo} />
      )
    }
  ]
  return (
    <div className={styles.container}>
      <Head>
        <title>Kapital To-do</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tab tabBody={tabBody}></Tab>
      <div onClick={() => dispatch(setModalAdd(true))}>
        <AddButton/>
      </div>

      {modalAdd && 
        <Modal title={"Add To Do"} onClose={() => dispatch(setModalAdd(false))}>
          <AddForm onSuccess={() => {
              dispatch(setModalAdd(false))
              dispatch(fetchData(!fetchStatus))
            }} />
        </Modal>
      }

      
    </div>
  )
}

