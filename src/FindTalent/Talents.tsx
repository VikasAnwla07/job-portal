import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { talents } from "../Data/TalentData";

const Talents = () => {
    return (
        <div className="p-5">
            <div className="flex justify-between">
                <div className="text-2xl font-semibold">Talents</div>
                <Sort />
            </div>
            <div className="mt-10 justify-between flex flex-wrap gap-8 px-8 py-6">
                {
                    talents.map((talent, index) => <TalentCard key={index} {...talent} />)
                }
            </div>

        </div>
    )
}
export default Talents;