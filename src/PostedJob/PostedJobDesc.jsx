import { Badge, Tabs } from "@mantine/core";
import JobDesc from "../JobDesc/JobDesc";
import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";
import { useEffect, useState } from "react";

const PostedJobDesc = (props) => {
  const [tab, setTab] = useState("overview");
  const [arr, setArr] = useState([]);
  const handleTabChange = (value) => {
    setTab(value);
    if (value === "applicants") {
      setArr(
        props.applicants?.filter((x) => x.applicationStatus === "APPLIED")
      );
    } else if (value === "invited") {
      setArr(
        props.applicants?.filter((x) => x.applicationStatus === "INTERVIEWING")
      );
    } else if (value === "offered") {
      setArr(
        props.applicants?.filter((x) => x.applicationStatus === "OFFERED")
      );
    } else if (value === "rejected") {
      setArr(
        props.applicants?.filter((x) => x.applicationStatus === "REJECTED")
      );
    }
  };
  useEffect(() => {
    handleTabChange("overview");
  }, [props]);
  return (
    <div className="mt-5 w-3/4 px-5">
      {props.jobTitle ? (
        <>
          <div className="text-2xl font-semibold mt-5 flex items-center">
            {props.jobTitle}
            <Badge variant="light" ml="sm" color="brightSun.4" size="sm">
              {props.jobStatus}
            </Badge>
          </div>
          <div className="font-medium mb-5 text-mine-shaft-300">
            {props.location}
          </div>
          <div>
            <Tabs
              variant="outline"
              radius="lg"
              value={tab}
              onChange={handleTabChange}
              defaultValue="overview"
            >
              <Tabs.List className="[&_button]:text-xl mb-5 font-semibold [&_button[data-active='true']]:text-bright-sun-400">
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                <Tabs.Tab value="invited">Invited</Tabs.Tab>
                <Tabs.Tab value="offered">Offered</Tabs.Tab>
                <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="overview" className="[&>div]:w-full">
                <JobDesc
                  {...props}
                  edit={true}
                  closed={props.jobStatus == "CLOSED"}
                />
              </Tabs.Panel>
              <Tabs.Panel value="applicants">
                <div className="mt-10 flex flex-wrap gap-10 justify-around">
                  {arr?.length ? (
                    arr.map((job, index) => (
                      <TalentCard key={index} {...job} posted={true} />
                    ))
                  ) : (
                    <div className="text-2xl font-semibold mt-5 flex justify-center min-h-[70vh] items-center">
                      No Applicants Found
                    </div>
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="invited">
                <div className="mt-10 flex flex-wrap gap-10 justify-around">
                  {arr?.length ? (
                    arr.map((job, index) => (
                      <TalentCard key={index} {...job} invited={true} />
                    ))
                  ) : (
                    <div className="text-2xl font-semibold mt-5 flex justify-center min-h-[70vh] items-center">
                      No Invited Applicants Found
                    </div>
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="offered">
                <div className="mt-10 flex flex-wrap gap-10 justify-around">
                  {arr?.length ? (
                    arr.map((job, index) => (
                      <TalentCard key={index} {...job} offered />
                    ))
                  ) : (
                    <div className="text-2xl font-semibold mt-5 flex justify-center min-h-[70vh] items-center">
                      No Offered Applicants Found
                    </div>
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="rejected">
                <div className="mt-10 flex flex-wrap gap-10 justify-around">
                  {arr?.length ? (
                    arr.map((job, index) => (
                      <TalentCard key={index} {...job} offered />
                    ))
                  ) : (
                    <div className="text-2xl font-semibold mt-5 flex justify-center min-h-[70vh] items-center">
                      No Rejected Applicants Found
                    </div>
                  )}
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        </>
      ) : (
        <div className="text-2xl font-semibold mt-5 flex justify-center min-h-[70vh] items-center">
          No Job Selected
        </div>
      )}
    </div>
  );
};
export default PostedJobDesc;
