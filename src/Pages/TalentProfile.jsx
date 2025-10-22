import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import RecommendTalent from "../TalentProfile/RecommendTalent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProfiles } from "../Services/ProfileService";
import { talents } from "../Data/TalentData";

const TalentProfile = () => {
  const navigate = useNavigate();
  const [job, setjob] = useState([]);
  useEffect(() => {
    getAllProfiles()
      .then((res) => {
        setjob(res);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
      });
  }, []);
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Divider size="xs" />

      <Button
        onClick={() => navigate(-1)}
        leftSection={<IconArrowLeft size={20} />}
        my="sm"
        color="brightSun.4"
        variant="light"
      >
        Back
      </Button>

      <div className="flex gap-5">
        <Profile />
        <RecommendTalent talents={talents} />
      </div>
    </div>
  );
};
export default TalentProfile;
