import firebase from "firebase"

export async function getAllTodo (uid){
  let db = firebase.firestore()
  const myTodo = await db.collection("todo").where("uid", "==", uid)
    .get()
  return myTodo.docs.map(doc => {
    return {
      data: doc.data(),
      id: doc.id
    }
  })  
}

export async function getCompletedTodo(uid) {
  let db = firebase.firestore()
  const myTodo = await db.collection("todo").where("uid", "==", uid).where("status", "==", true)
    .get()
  return myTodo.docs.map(doc => {
    return {
      data: doc.data(),
      id: doc.id
    }
  })  
}

export async function deleteTodo (id) {
  let db = firebase.firestore()
  const deleteData = await db.collection("todo").doc(id).delete()
  return deleteData
}

export async function updateTodo (todoEdited, status) {
  let db = firebase.firestore()
  const updateData = await db.collection("todo").doc(todoEdited.id).set({
    status,
    taskName: todoEdited.data.taskName,
    uid: todoEdited.data.uid,
  })
  return updateData
}