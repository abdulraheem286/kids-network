import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useNavigate, Link } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import AuthContext from "./components/AuthContext";
import Footer from "./components/Footer";

export default function App() {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const navigate = useNavigate();
  useEffect(() => {}, [userDetails]);
  const logout = () => {
    localStorage.removeItem("user");
    setUserDetails(null);
    navigate("/", { replace: true });
  };
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
                <Link className="nav-link" to={"/"}>
                  E-Learning
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>
                  Shop with Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to={"/community"}>
                  Community
                </Link>
              </li>
              {userDetails?.isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link " to={"/admin/courses"}>
                    Admin Panel
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              {!userDetails?.email ? (
                <>
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
                </>
              ) : (
                <li className="nav-item">
                  <button
                    className="nav-link"
                    style={{ border: "none", backgroundColor: "transparent" }}
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              )}
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
