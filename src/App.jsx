import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Layout from "./layout/Layout.jsx";
import VerifyEmail from "./pages/auth/VerifyEmail.jsx";
import Signup from "./pages/auth/Signup.jsx";
import { ToastContainer } from "react-toastify";
import Signin from "./pages/auth/Signin.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ExtraInfo from "./pages/auth/ExtraInfo.jsx";
import CreateQuiz from "./pages/quest/CreateQuiz.jsx";
import SolveQuiz from "./pages/quest/SolveQuiz.jsx";
import HistoryPage from "./pages/quest/HistoryPage.jsx";
import ProfilePage from "./pages/profile/Profile.jsx";
import NotFound from "./pages/home/NotFound.jsx";

const GoogleAuthWrapper = () => (
  <GoogleOAuthProvider clientId="832136972760-okhj2j7j5gcrio9metbttl11opn7kla6.apps.googleusercontent.com">
    <VerifyEmail />
  </GoogleOAuthProvider>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/verifyEmail" element={<GoogleAuthWrapper />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/extraInfo" element={<ExtraInfo />} />
          <Route path="/createquiz" element={<CreateQuiz />} />
          <Route path="/solvequiz" element={<SolveQuiz />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
