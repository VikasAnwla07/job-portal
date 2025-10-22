import { Tabs } from "@mantine/core";
import { jobList } from "../Data/JobsData";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";
import { use } from "react";
import { useSelector } from "react-redux";

const JobHistory = () => {
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("APPLIED");
  const [jobList, setJobList] = useState([]);
  const [showList, setShowList] = useState([]);
  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res);
        setShowList(
          res.filter((job) => {
            let found = false;
            job.applicants?.forEach((applicant) => {
              if (
                applicant.applicantId == user.id &&
                applicant.applicationStatus == "APPLIED"
              ) {
                found = true;
              }
            });
            return found;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleTabChange = (value) => {
    setActiveTab(value);
    if (value === "SAVED") {
      setShowList(jobList.filter((job) => profile.savedJobs?.includes(job.id)));
    } else {
      setShowList(
        jobList.filter((job) => {
          let found = false;
          job.applicants?.forEach((applicant) => {
            if (
              applicant.applicantId == user.id &&
              applicant.applicationStatus == value
            ) {
              found = true;
            }
          });
          return found;
        })
      );
    }
  };
  return (
    <div className="">
      <div className="text-2xl font-semibold mt-5 mb-5">Job History</div>
      <div>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="outline"
          radius="lg"
        >
          <Tabs.List className="[&_button]:text-xl mb-5 font-semibold [&_button[data-active='true']]:text-bright-sun-400">
            <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
            <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
            <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
            <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={activeTab}>
            <div className="mt-10 flex flex-wrap gap-5">
              {showList.map((job, index) => (
                <Card
                  key={index}
                  {...job}
                  {...{ [activeTab.toLowerCase()]: true }}
                />
              ))}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};
export default JobHistory;
