import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import ApplyJobComp from "../ApplyJob/ApplyJobComp";

const ApplyJobPage = () => {
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['Poppins'] p-4">
            <Link className="my-4 inline-block" to="/jobs">
                <Button color="bright-sun.4" leftSection={<IconArrowLeft size={20} />} variant="light">Back</Button>
            </Link>
            <ApplyJobComp />
        </div>

    );
}
export default ApplyJobPage;