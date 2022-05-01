import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import firebase from "firebase";
import "firebase/firestore";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { MDBContainer, MDBAlert } from "mdbreact";
import AuthContext from "../components/AuthContext";

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
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [signedIn, setsignedIn] = useState(null);
  const handleSubmit = async (values) => {
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
            .collection("users").doc(res.user.uid)
            .set(values)
            .then(() => {
              setsignedIn("signedIn");
              localStorage.setItem("user", JSON.stringify({
                id: res.user.uid,
                values
              }));
              authContext.setUserDetails(values);
              setTimeout(() => {
                navigate("/", { replace: true });
              }, 1000);
            });
        })
        .catch((err) => {
          console.log(err, "error");
        });
    } else {
      setsignedIn("notSignedIn");
    }
  };

  return (
    <>
      {signedIn === "signedIn" && (
        <AlertPage
          color="success"
          keyword="Congratulation"
          message="You have been signed up successfully"
        />
      )}
      {signedIn === "notSignedIn" && (
        <AlertPage
          color="danger"
          keyword="Sorry"
          message="User with same email already exists"
        />
      )}
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
const AlertPage = ({ color, keyword, message }) => {
  return (
    <MDBContainer>
      <MDBAlert color={color}>
        <strong>{keyword}!</strong> {message}.
      </MDBAlert>
    </MDBContainer>
  );
};
