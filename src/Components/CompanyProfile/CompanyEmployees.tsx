import { talents } from "../../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const CompanyEmployees = () => {
    return (
        <div className="mt-10 flex flex-wrap gap-10 px-8 py-6">
            {
                talents.map((talent, index) => index < 5 && <TalentCard key={index} {...talent} />)
            }
        </div>

    )
}
export default CompanyEmployees;