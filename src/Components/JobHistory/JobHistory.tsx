import { Tabs } from "@mantine/core";
import { jobList } from "../../Data/JobsData";
import Card from "./Card";

const JobHistory = () => {
    return (
        <div className="">
            <div className="text-2xl font-semibold mb-5 ">Job History</div>
            <div>
                <Tabs variant="outline" radius="lg" defaultValue="applied">
                    <Tabs.List className="[&_button]:!text-lg mb-5 font-semibold [&_button[data-active='true']]:text-bright-sun-400">
                        <Tabs.Tab value="applied">Applied</Tabs.Tab>
                        <Tabs.Tab value="saved">Saved</Tabs.Tab>
                        <Tabs.Tab value="offered">Offered</Tabs.Tab>
                        <Tabs.Tab value="interviewing">Interviewing</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="applied">
                        <div className="flex mt-10 flex-wrap gap-8 px-8 py-6">
                            {
                                jobList.map((job, index) => <Card key={index} {...job} applied/>)
                            }
                        </div>

                    </Tabs.Panel>
                    <Tabs.Panel value="saved">
                        <div className="flex mt-10 flex-wrap gap-8 px-8 py-6">
                            {
                                jobList.map((job, index) => <Card key={index} {...job} saved/>)
                            }
                        </div>

                    </Tabs.Panel>
                    <Tabs.Panel value="offered">
                        <div className="flex mt-10 flex-wrap gap-8 px-8 py-6">
                            {
                                jobList.map((job, index) => <Card key={index} {...job} offered/>)
                            }
                        </div>

                    </Tabs.Panel>
                    <Tabs.Panel value="interviewing">
                        <div className="flex mt-10 flex-wrap gap-8 px-8 py-6">
                            {
                                jobList.map((job, index) => <Card key={index} {...job} interviewing/>)
                            }
                        </div>

                    </Tabs.Panel>
                </Tabs>
            </div>

        </div>
    )
}
export default JobHistory;