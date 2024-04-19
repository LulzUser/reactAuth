import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "./App.css";

// Configure Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC8QBbbf5yG6-4R9VBamyGBb33li_7argw",
  authDomain: "reactauth-aff4e.firebaseapp.com",
  projectId: "reactauth-aff4e",
  storageBucket: "reactauth-aff4e.appspot.com",
  messagingSenderId: "61577505409",
  appId: "1:61577505409:web:2eebb231bb144084f7fb80",
  measurementId: "G-27WSWKGV6H",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      setError(null);
      setUser(userCredential.user);
      // Login bem-sucedido, você pode redirecionar ou fazer outras ações aqui
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await firebase.auth().signInWithPopup(provider);
      setError(null);
      setUser(userCredential.user);
      // Login bem-sucedido, você pode redirecionar ou fazer outras ações aqui
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  const handleSignOut = async () => {
    try {
      firebase.auth().signOut().then(function() {
        console.log('Deslogado.');
      });
      setError(null);
      setUser(null)
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };
  return (
    <div class="content">
      <img src="./etec.jpg" alt="etec"></img>
      <table>
          <h1>Autentificação do Firebase</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <tr>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleGoogleLogin}>Login com Google</button>
          <button onClick={handleSignOut}>Sair</button>
          {error && <p>{error}</p>}
          {user && (
            <div>
              <h2>Seus dados:</h2>
              <p>Nome: {user.displayName || "Não possui nome"}</p>
              <p>Email: {user.email}</p>
              <p>ID: {user.uid}</p>
            </div>
          )}
        </tr>
      </table>
    </div>
  );
}

export default App;
