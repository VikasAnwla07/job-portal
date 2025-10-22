import { useParams } from "react-router-dom";
import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const RecommendTalent = (props) => {
  const { id } = useParams();
  return (
    <div>
      <div className="text-xl font-semibold mb-5">Recommended job</div>
      <div className="flex flex-col flex-wrap gap-5">
        {props.talents.map(
          (job, index) =>
            index < 4 && id != job.id && <TalentCard key={index} {...job} />
        )}
      </div>
    </div>
  );
};
export default RecommendTalent;
