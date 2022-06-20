import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => (
  <>
    <footer className="footer">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 text-center">
            <div className="footer-site-logo mb-4">
              <Link to={"/"}>
                <img src={require("../Assets/Logo.svg")} alt="logo" />
              </Link>
            </div>
            <ul className="list-unstyled nav-links mb-5">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <Link to={"/courses"}>E-Learning</Link>
              </li>
              <li>
                <Link to={"/shop"}>Shop Now</Link>
              </li>
              <li>
                <Link to={"/community"}>Community</Link>
              </li>
            </ul>

            {/* <div className="social mb-4">
              <h3>Stay in touch</h3>
              <ul className="list-unstyled">
                <li className="in">
                  <a href="#">
                    <span className="icon-instagram"></span>
                  </a>
                </li>
                <li className="fb">
                  <a href="#">
                    <span className="icon-facebook"></span>
                  </a>
                </li>
                <li className="tw">
                  <a href="#">
                    <span className="icon-twitter"></span>
                  </a>
                </li>
                <li className="pin">
                  <a href="#">
                    <span className="icon-pinterest"></span>
                  </a>
                </li>
                <li className="dr">
                  <a href="#">
                    <span className="icon-dribbble"></span>
                  </a>
                </li>
              </ul>
            </div> */}

            <div className="copyright">
              © 2020 Copyright:
              <a href="/"> KidsNetwork</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
