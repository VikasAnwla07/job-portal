import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import FindJobs from "./FindJobs";
import FindTalentPage from "./FindTalentPage";
import TalentProfilePage from "./TalentProfilePage";
import PostJobPage from "./PostJobPage";
import JobDescPage from "./JobDescPage";
import ApplyJobPage from "./ApplyJobPage";
import CompanyPage from "./CompanyPage";
import PostedJobPage from "./PostedJobPage";
import JobHistoryPage from "./JobHistoryPage";
import SignUpPage from "./SignUpPage";
import ProfilePage from "./ProfilePage";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { Divider } from "@mantine/core";
import HomePage from "./HomePage";
import { useSelector } from "react-redux";

const AppRoutes = () =>{
    const user = useSelector((state:any)=>state.user);
    return(
    <BrowserRouter>
          <div className="relative">
            <Header />
            <Divider size="xs" mx="md" className="bg-mine-shaft-700 mx-3" />
            <Routes>
              <Route path="/find-jobs" element={<FindJobs />} />
              <Route path="/find-talent" element={<FindTalentPage />} />
              <Route path="/jobs" element={<JobDescPage />} />
              <Route path="/post-job" element={<PostJobPage />} />
              <Route path="/apply-job" element={<ApplyJobPage />} />
              <Route path="/talent-profile" element={<TalentProfilePage />} />
              <Route path="/company" element={<CompanyPage />} />
              <Route path="/posted-job" element={<PostedJobPage />} />
              <Route path="/job-history" element={<JobHistoryPage />} />
              <Route path="/signup" element={ user ? <Navigate to="/" /> : <SignUpPage />} />
              <Route path="/login" element={user ? <Navigate to="/" /> : <SignUpPage />} />
              <Route path="*" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
    )
}
export default AppRoutes;