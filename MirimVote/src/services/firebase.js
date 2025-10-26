import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged  } from "firebase/auth";
import firebaseConfig from "../firebaseConfig.json";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function getUser(uid) {
    if (!uid) {
        // window.location.href = '/';
        return null;
    }
    fetch('http://localhost:3000/auth/getUser/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${uid}`
        },
        body: JSON.stringify({ uid: uid })
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
}

export { app, auth, provider, getUser };