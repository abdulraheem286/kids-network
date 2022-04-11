import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../Screens/Login";
import SignUp from "../Screens/Signup";
import ForgotPassword from "../Screens/ForgotPassword";
import LearningLandingPage from "../Screens/LearningLandingPage";
import Courses from "../Screens/Courses";
import CoursesDetails from "../Screens/CoursesDetails";
import CoursesVideos from "./../Screens/CoursesVideos";
import Community from "./Community/Community";

export default function AppRouter() {
  return (
    <Routes>
      <Route exact path="/" element={<LearningLandingPage />} />
      <Route exact path="/sign-in" element={<Login />} />
      <Route exact path="/sign-up" element={<SignUp />} />
      <Route exact path="/forgot-pass" element={<ForgotPassword />} />
      <Route exact path="/courses" element={<Courses />} />
      <Route exact path="/community" element={<Community />} />
      <Route exact path="/coursedetails/:data" element={<CoursesDetails />} />
      <Route exact path="/coursevideos/:id" element={<CoursesVideos />} />
    </Routes>
  );
}
