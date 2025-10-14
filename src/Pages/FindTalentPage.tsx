import { Divider } from "@mantine/core";
import SearchBar from "../FindTalent/SearchBar";
import Talents from "../FindTalent/Talents";

const FindTalentPage = () => {
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['Poppins']">
            <SearchBar />
            <Divider size="xs" mx="md" className="bg-mine-shaft-700 mx-3" />
            <Talents />
        </div>

    );
}
export default FindTalentPage;