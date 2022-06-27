import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANrmt3HVSJDcGvbTTB0DFD4CrLc7TgQpk",
  authDomain: "itss-21-6-38878.firebaseapp.com",
  projectId: "itss-21-6-38878",
  storageBucket: "itss-21-6-38878.appspot.com",
  messagingSenderId: "609271843433",
  appId: "1:609271843433:web:6eb0a239ab1de1c45270f8",
  measurementId: "G-N18MXL705V",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
export const auth = firebase.auth();

export const getFirebaseItems = async () => {
  try {
    const docs = await firestore.collection("Todos").get().docs;
    const items = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const addFirebaseItem = async (item) => {
  try {
    const todos = firestore.collection("Todos");
    await todos.add(item);
  } catch (err) {
    console.log(err);
  }
};

export const updateFirebaseItem = async (item, id) => {
  try {
    const todos = firestore.collection("Todos").doc(id);
    await todos.update(item);
  } catch (err) {
    console.log(err);
  }
};

export const clearFirebaseItem = async (item) => {
  const todos = firestore.collection("Todos").doc(item.id);
  await todos
    .delete()
    .then(function () {})
    .catch(function (err) {
      console.log(err);
    });
};

export default firebase;
