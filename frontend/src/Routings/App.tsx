import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPanel from "../Features/LogIn";
import HomePage from "../Features/Home";
import SignUpPanel from "../Features/SignUp";
import ForgotPanel from "../Features/ForgotPassword";
import ChangePasswordPanel from "../Features/ChangePassword";
import ProfileRequestPanel from "../Features/ProfileRequest";
import SearchPanel from "../Features/ProfileSearch";
import PrecinctPanel from "../Features/Precinct";
import CandidatePanel from "../Features/Candidate";
import RacePanel from "../Features/Race";
import DistrictPanel from "../Features/District";
import ElectionPanel from "../Features/Election";
import BallotPage from "../Features/Ballot";
import BallotAdminPanel from "../Features/BallotAdmin";
import UserProfilePanel from "../Features/UserProfile";
import CandidateProfilePanel from "../Features/CandidateProfile";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<LoginPanel />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="signup" element={<SignUpPanel />}></Route>
        <Route path="/forgot_password" element={<ForgotPanel />}></Route>
        <Route
          path="/change_password"
          element={<ChangePasswordPanel />}
        ></Route>
        <Route path="/request" element={<ProfileRequestPanel />}></Route>
        <Route path="/search" element={<SearchPanel />}></Route>
        <Route path="/precinct" element={<PrecinctPanel />}></Route>
        <Route path="/candidate" element={<CandidatePanel />}></Route>
        <Route path="/race" element={<RacePanel />}></Route>
        <Route path="/district" element={<DistrictPanel />}></Route>
        <Route path="/election" element={<ElectionPanel />}></Route>
        <Route path="/ballot_admin" element={<BallotAdminPanel />}></Route>
        <Route path="/ballot_voter" element={<BallotPage />}></Route>
        <Route path="/user_profile" element={<UserProfilePanel />}></Route>
        <Route path="/candidate_voter" element={<CandidateProfilePanel />}></Route>
      </Routes>
    </>
  );
}
