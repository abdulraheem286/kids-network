import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import firebase from "firebase";
import "firebase/firestore";
import * as Yup from "yup";
import AuthContext from "./../components/AuthContext";
import { useNavigate } from "react-router";

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
  const handleSubmit = async (values) => {
    console.log(values, "values");
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(async (userCredential) => {
        console.log(userCredential, "credentials");
        firebase
          .firestore()
          .collection("users")
          .where("email", "==", values.email)
          .get()
          .then((res) => {
            res.forEach((doc) => {
              if (values.password === doc.data().password) {
                localStorage.setItem("user", JSON.stringify(doc.data()));
                authContext.setUserDetails(doc.data());
                alert("Welcome");
                navigate("/e-learning");
              }
            });
          });

        var user = userCredential.id;
        console.log(user);
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
        alert("Wrong Password/ User Don't Exist");
      });
  };

  return (
    <>
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
