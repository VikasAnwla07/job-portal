import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const CompanyEmployees = () => {
  return (
    <div className="mt-10 flex flex-wrap gap-12">
      {talents.map((job, index) => index < 6 && <TalentCard key={index} {...job} />)}
    </div>
  );
};
export default CompanyEmployees;
