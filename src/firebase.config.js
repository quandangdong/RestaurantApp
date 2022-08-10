import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAivNNWMwzl5LQNGionRNPbI91G0BMMhZ0",
  authDomain: "restaurantapp-d1560.firebaseapp.com",
  databaseURL: "https://restaurantapp-d1560-default-rtdb.firebaseio.com",
  projectId: "restaurantapp-d1560",
  storageBucket: "restaurantapp-d1560.appspot.com",
  messagingSenderId: "598119834363",
  appId: "1:598119834363:web:a1790b606ccf51e85b865e"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
