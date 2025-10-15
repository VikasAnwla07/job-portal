import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import RecommendedJobs from "../Components/JobDesc/RecommendedJobs";
import Job from "../Components/JobDesc/Job";


const JobDescPage = () => {
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['Poppins'] p-4">
            <Link className="my-4 inline-block" to="/find-jobs">
                <Button color="bright-sun.4" leftSection={<IconArrowLeft size={20} />} variant="light">Back</Button>
            </Link>
            <div className="flex gap-5 justify-around">
                <Job />
                <RecommendedJobs />
            </div>
        </div>

    );
}
export default JobDescPage;