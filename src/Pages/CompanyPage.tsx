import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Company from "../Components/CompanyProfile/Company";
import SimilarCompanies from "../Components/CompanyProfile/SimilarCompanies";

const CompanyPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['Poppins'] p-4">
            <Button my="md" onClick={() => navigate(-1)} color="bright-sun.4" leftSection={<IconArrowLeft size={20} />} variant="light">Back</Button>
            <div className="flex gap-5 justify-between">
                <Company />
                <SimilarCompanies />
            </div>
        </div>
    )
}
export default CompanyPage;