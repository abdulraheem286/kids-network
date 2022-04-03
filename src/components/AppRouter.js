import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../Screens/Login";
import SignUp from "../Screens/Signup";
import ForgotPassword from "../Screens/ForgotPassword";
import LearningLandingPage from "../Screens/LearningLandingPage";
import Courses from "../Screens/Courses";
import CoursesDetails from "../Screens/CoursesDetails";
import CoursesVideos from "./../Screens/CoursesVideos";

export default function AppRouter() {
  return (
    <Routes>
      <Route exact path="/sign-in" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-pass" element={<ForgotPassword />} />
      <Route path="/e-learning" element={<LearningLandingPage />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/coursedetails/:data" element={<CoursesDetails />} />
      <Route path="/coursevideos/:id" element={<CoursesVideos />} />
    </Routes>
  );
}
