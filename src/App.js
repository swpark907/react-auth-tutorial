import React from "react";
import { useState } from "react";
import "./App.css";
import Register from "./Register";
import Login from "./Login";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="App">
      <div className="container">
        {isLogin ? <Login /> : <Register setIsLogin={setIsLogin} />}
      </div>
    </main>
  );
};

export default App;
