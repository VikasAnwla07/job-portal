import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import FindJobs from "./FindJobs";
import FindTalent from "./FindTalent";
import JobDescPage from "./JobDescPage";
import ApplyJobPage from "./ApplyJobPage";
import CompanyPage from "./CompanyPage";
import PostedJobPage from "./PostedJobPage";
import JobHistoryPage from "./JobHistoryPage";
import TalentProfile from "./TalentProfile";
import PostJobPage from "./PostJobPage";
import SignUpPage from "./SignUpPage";
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeProfile } from "../Slices/ProfileSlice";
import { getProfile } from "../Services/ProfileService";
import ProtectedRoute from "../Services/ProtectedRoute";

const AppRoutes = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user && user.id) {
        const profile = await getProfile(user.id);
        dispatch(changeProfile(profile));
      }
    };
    fetchProfile();
  }, [user, dispatch]);
  return (
    <>
      <BrowserRouter>
        <div className="relative">
          <Header />
          <Routes>
            <Route path="/find-jobs" element={<FindJobs />} />
            <Route path="/find-talent" element={<FindTalent />} />
            <Route path="/jobs/:id" element={<JobDescPage />} />

            <Route path="/apply-job/:id" element={<ApplyJobPage />} />
            <Route path="/company/:name" element={<CompanyPage />} />
            <Route path="/posted-job/:id" element={<PostedJobPage />} />

            <Route path="/job-history" element={<JobHistoryPage />} />
            <Route path="/talent-profile/:id" element={<TalentProfile />} />
            <Route path="/post-job/:id" element={<PostJobPage />} />

            {/* <Route
              path="/job-history"
              element={
                <ProtectedRoute allowedRoles={["APPLICANT"]}>
                  <JobHistoryPage />
                </ProtectedRoute>
              }
            />
            <Route path="/talent-profile/:id" element={<TalentProfile />} />
            <Route
              path="/post-job/:id"
              element={
                <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                  <PostJobPage />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <SignUpPage />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <SignUpPage />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};
export default AppRoutes;
