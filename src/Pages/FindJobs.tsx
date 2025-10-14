import { Divider } from "@mantine/core";
import SearchBar from "../FindJobs/SearchBar";
import Jobs from "../FindJobs/Jobs";

const FindJobs = () => {
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['Poppins']">
            <SearchBar />
            <Divider size="xs" mx="md" className="bg-mine-shaft-700 mx-3" />
            <Jobs />
        </div>

    );
}
export default FindJobs;