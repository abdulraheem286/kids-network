import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useNavigate, Link } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import AuthContext from "./components/AuthContext";
import Footer from "./components/Footer";
import avatar from "./Assets/avatar2.png";
import { useToken } from "./hooks/useToken";

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
          <Link className="navbar-brand font-weight-bold" to={"/"}>
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
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/courses"}>
                  E-Learning
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/shop"}>
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
                  <Link className="nav-link " to={"/admin"}>
                    Admin Panel
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto" style={{ marginRight: "25px" }}>
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
                <li className="d-flex nav-item align-items-center">
                  <div className=" d-flex align-items-center">
                    <img
                      style={{ width: "25px", height: "25px" }}
                      src={avatar}
                    />
                    <p className="m-2">
                      <strong>
                        {userDetails.fName} {userDetails.lName}
                      </strong>
                    </p>
                    <div className="subnav">
                      <button
                        className="subnavbtn"
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <i class="fa fa-caret-down"></i>
                      </button>
                      <div class="subnav-content">
                        <a href="#" onClick={logout}>
                          Logout
                        </a>
                      </div>
                    </div>
                  </div>
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
