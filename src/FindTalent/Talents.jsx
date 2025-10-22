import { useEffect, useState } from "react";
import { talents } from "../Data/TalentData";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { getAllProfiles } from "../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";

const Talents = () => {
  const dispatch = useDispatch();
  const [talents, setTalents] = useState([]);
  const filter = useSelector((state) => state.filter);
  const sort = useSelector((state) => state.sort);
  const [filteredtalents, setFilteredTalents] = useState([]);
  useEffect(() => {
    dispatch(resetFilter());
    getAllProfiles()
      .then((res) => {
        setTalents(res);
      })
      .catch((err) => {
        console.error("Failed to fetch jobs:", err);
      });
  }, []);

   useEffect(()=>{
   if(sort == "Experience: Low to High"){
    setTalents([...talents].sort((a,b)=> a.totalExp - b.totalExp));
  } else if(sort == "Experience: High to Low"){
    setTalents([...talents].sort((a,b)=> b.totalExp - a.totalExp));
  } 
 },[sort])

  useEffect(() => {
    let filtered = talents;
    if (filter.name)
      filtered = filtered.filter((job) =>
        job.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    if (filter["Job Title"] && filter["Job Title"].length > 0)
      filtered = filtered.filter((job) =>
        filter["Job Title"]?.some((title) =>
          job.jobTitle.toLowerCase().includes(title.toLowerCase())
        )
      );

    if (filter.Location && filter.Location.length > 0)
      filtered = filtered.filter((job) =>
        filter.Location?.some((location) =>
          job.location.toLowerCase().includes(location.toLowerCase())
        )
      );

    if (filter.Skills && filter.Skills.length > 0)
      filtered = filtered.filter((job) =>
        filter.Skills?.some((skill) =>
          job.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase()))
        )
      );
    if (filter.exp && filter.exp.length > 0)
      filtered = filtered.filter(
        (job) => filter.exp[0] <= job.totalExp && job.totalExp <= filter.exp[1]
      );

    setFilteredTalents(filtered);
  }, [filter, talents]);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Talents</div>
        <Sort />
      </div>
      <div className="mt-10 flex flex-wrap gap-8 justify-between">
        {filteredtalents.length ? (
          filteredtalents.map((job, index) => <TalentCard key={index} {...job} />)
        ) : (
          <div className="text-2xl font-semibold">No talent Found</div>
        )}
      </div>
    </div>
  );
};
export default Talents;
