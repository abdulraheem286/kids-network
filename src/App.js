import React, { useContext, useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import AuthContext from "./components/AuthContext";
import Footer from "./components/Footer";

export default function App() {
  const [userDetails, setUserDetails] = useState();

  const restoreToken = () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"));
      if (!token) return;
      setUserDetails(token);
    } catch {
      console.log("no user");
    }
  };

  useEffect(() => {
    restoreToken();
  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <Link className="navbar-brand font-weight-bold" to={"/sign-in"}>
            <img
              src={require("./Assets/Logo.svg")}
              style={styles.mainLogo}
              alt="Logo"
            />
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto font-weight-bold">
              <li className="nav-item">
                <Link className="nav-link" to={"/e-learning"}>
                  E-Learning
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>
                  Shop with Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to={"/sign-up"}>
                  Community
                </Link>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <AuthContext.Provider value={{ userDetails, setUserDetails }}>
        <AppRouter />
      </AuthContext.Provider>
      <Footer />
    </div>
  );
}

const styles = {
  mainLogo: {
    maxHeight: 50,
  },
};
