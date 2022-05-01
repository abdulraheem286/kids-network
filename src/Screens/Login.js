import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import firebase from "firebase";
import "firebase/firestore";
import * as Yup from "yup";
import AuthContext from "./../components/AuthContext";
import { useNavigate } from "react-router";
import { MDBContainer, MDBAlert } from "mdbreact";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("*Email is Required").email().label("Email"),
  password: Yup.string()
    .required("*Password is Required")
    .min(6, "Password must be greater than 6 characters")
    .label("Password"),
});

export default function Login() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [loggedIn, setloggedIn] = useState(null);

  const handleSubmit = async (values) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(async (userCredential) => {
        firebase
          .firestore()
          .collection("users")
          .where("email", "==", values.email)
          .get()
          .then((res) => {
            res.forEach((doc) => {
              if (values.password === doc.data().password) {
                localStorage.setItem("user", JSON.stringify({ id: doc.id, ...doc.data() }));
                authContext.setUserDetails(doc.data());
                setloggedIn("loggedIn");
                setTimeout(() => {
                  navigate("/");
                }, 1000);
              }
            });
          });

        var user = userCredential.id;
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
        setloggedIn("notLoggedIn");
      });
  };

  return (
    <>
      {loggedIn === "loggedIn" && (
        <AlertPage
          color="success"
          keyword="Welcome"
          message="You have been logged in successfully"
        />
      )}
      {loggedIn === "notLoggedIn" && (
        <AlertPage
          color="danger"
          keyword="Try Again"
          message="Invalid Credentials"
        />
      )}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <div className="outer">
          <div className="inner">
            <Form>
              <h3>Log in</h3>

              <div className="mb-2">
                <Field
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                />
                <div className="text-danger">
                  <small>
                    <ErrorMessage name="email" />
                  </small>
                </div>
              </div>

              <div className="mb-2">
                <Field
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                />
                <div className="text-danger">
                  <small>
                    <ErrorMessage name="password" />
                  </small>
                </div>
              </div>

              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-dark btn-lg btn-block">
                Sign in
              </button>
              <p className="forgot-password text-right">
                Forgot <a href="forgot-pass">Password?</a>
              </p>
            </Form>
          </div>
        </div>
      </Formik>
    </>
  );
}
const AlertPage = ({ color, keyword, message }) => {
  return (
    <MDBContainer>
      <MDBAlert color={color}>
        <strong>{keyword}!</strong> {message}.
      </MDBAlert>
    </MDBContainer>
  );
};
