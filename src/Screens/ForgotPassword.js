import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("*Email is Required").email().label("Email"),
});

export default function ForgotPassword() {
  const handleSubmit = async (values) => {
    console.log(values, "values");
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
        <Form>
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
      </Formik>
    </>
  );
}
