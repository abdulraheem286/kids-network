import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import firebase from "firebase";
import "firebase/firestore";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fName: Yup.string().required("*First Name Required").label("First Name"),
  lName: Yup.string().required("*Last Name Required").label("Last Name"),
  email: Yup.string().required("*Email is Required").email().label("Email"),
  password: Yup.string()
    .required("*Password is Required")
    .min(6, "Password must be greater than 6 characters")
    .label("Password"),
});

export default function SignUp() {
  const handleSubmit = async (values) => {
    console.log(values, "values");
    const userCheck = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", values.email)
      .get();

    if (userCheck.empty) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((res) => {
          firebase
            .firestore()
            .collection("users")
            .add(values)
            .then(() => {
              console.log("done");
            });
          console.log(res, "response");
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          fName: "",
          lName: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {(formik) => (
          <div className="outer">
            <div className="inner">
              {" "}
              <Form>
                <h3>Sign Up</h3>
                <div className="mb-2">
                  <Field
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    name="fName"
                  />
                  <div className="text-danger">
                    <small>
                      <ErrorMessage name="fName" />
                    </small>
                  </div>
                </div>

                <div className="mb-2">
                  <Field
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    name="lName"
                  />
                  <div className="text-danger">
                    <small>
                      <ErrorMessage name="lName" />
                    </small>
                  </div>
                </div>

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

                <button
                  type="submit"
                  className="btn btn-dark btn-lg btn-block mt-3"
                >
                  Register
                </button>
              </Form>
            </div>
          </div>
        )}
      </Formik>

      <p className="forgot-password text-right">
        Already registered <a href="sign-in">Login?</a>
      </p>
    </>
  );
}
