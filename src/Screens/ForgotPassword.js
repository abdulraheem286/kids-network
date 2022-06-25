import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import firebase from "firebase"
const validationSchema = Yup.object().shape({
  email: Yup.string().required("*Email is Required").email().label("Email"),
});

export default function ForgotPassword() {
  const handleSubmit = async (values) => {
    firebase.auth().sendPasswordResetEmail(values.email)
    alert("Password reset link has been sent to your email")
  };
  return (
    <>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <div className="outer">
          <div className="inner">
            <Form >
              <h3>Forgot Password</h3>

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

              <button type="submit" className="btn btn-dark btn-lg btn-block">
                Reset Password
              </button>
              <p className="forgot-password text-right">
                <a href="sign-in">Login?</a>
              </p>
            </Form>
          </div>
        </div>
      </Formik>
    </>
  );
}
