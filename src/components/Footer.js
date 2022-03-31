import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => (
  <footer
    className="page-footer font-small blue pt-4 bg-light"
    style={{ marginTop: 100 }}
  >
    <Container>
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <h5 className="text-uppercase">Footer Content</h5>
            <p style={{ maxWidth: 250 }}>
              Here you can use rows and columns to organize your footer content.
            </p>
          </div>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <div className="col-md-2 mb-md-0 mb-3">
            <h5 className="text-uppercase">e-com</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!">Link 1</a>
              </li>
              <li>
                <a href="#!">Link 2</a>
              </li>
              <li>
                <a href="#!">Link 3</a>
              </li>
              <li>
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </div>

          <div className="col-md-2 mb-md-0 mb-3">
            <h5 className="text-uppercase">e-learn</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!">Link 1</a>
              </li>
              <li>
                <a href="#!">Link 2</a>
              </li>
              <li>
                <a href="#!">Link 3</a>
              </li>
              <li>
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </div>

          <div className="col-md-2 mb-md-0 mb-3">
            <h5 className="text-uppercase">Community</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!">Link 1</a>
              </li>
              <li>
                <a href="#!">Link 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-copyright text-center py-3">
        © 2020 Copyright:
        <a href="/"> KidsNetwork</a>
      </div>
    </Container>
  </footer>
);

export default Footer;
