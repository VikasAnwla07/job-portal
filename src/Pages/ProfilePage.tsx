import { Divider } from "@mantine/core";
import Profile from "../Components/Profile/Profile";
import { profile } from "../Data/TalentData";

const ProfilePage = () =>{
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] overflow-hidden">
            <Divider mx="md" mb="xl" />
            <Profile {...profile} />
        </div>
    )
}
export default ProfilePage;