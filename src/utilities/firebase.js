import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update, connectDatabaseEmulator } from "firebase/database";
import { connectAuthEmulator, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithCredential, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA_EwfiPd66iSvCus8BLkmw73Xwf2EEJfI",
  authDomain: "cs397rps101.firebaseapp.com",
  databaseURL: "https://cs397rps101-default-rtdb.firebaseio.com",
  projectId: "cs397rps101",
  storageBucket: "cs397rps101.appspot.com",
  messagingSenderId: "273277845246",
  appId: "1:273277845246:web:f6db9b0b5d271373bdefaf",
  measurementId: "G-14XKCK95RS"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();
  
  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ));

  return [user];
};

if (!window.EMULATION && import.meta.env.VITE_EMULATE) {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectDatabaseEmulator(database, "127.0.0.1", 9000);
  
    signInWithCredential(auth, GoogleAuthProvider.credential(
      '{"sub": "12wPhjF5djdHvCqQkvUGx2z0X4rB", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
    ));
    
    window.EMULATION = true;
  }
