import React from "react";
import { useState } from "react";
import "./App.css";
import Register from "./Register";
import Login from "./Login";

const App = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <main className="App">
      <div className="container">
        {isRegister ? <Login setIsLogin={setIsLogin} /> : <Register setIsRegister={setIsRegister} />}
      </div>
    </main>
  );
};

export default App;
