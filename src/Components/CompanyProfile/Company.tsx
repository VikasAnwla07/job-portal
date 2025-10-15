import { Avatar, Divider, Tabs } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import AboutComp from "./AboutComp";
import CompanyJobs from "./CompanyJobs";
import CompanyEmployees from "./CompanyEmployees";

const Company = () => {
    return (
        <div className="w-3/4">
            <div className="relative">
                <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="Profile Background" />
                <img className="rounded-3xl h-36 w-36 -bottom-1/4 bg-mine-shaft-950 left-5 p-2 border-mine-shaft-950 border-8 absolute" src="/Icons/Google.png" alt="Profile Picture" />
            </div>
            <div className="px-3 mt-12">
                <div className="text-3xl font-semibold flex justify-between" >
                    Google
                    <Avatar.Group>
                        <Avatar src="avatar1.png" />
                        <Avatar src="avatar2.png" />
                        <Avatar src="avatar.png" />
                        <Avatar>+10K</Avatar>
                    </Avatar.Group>
                </div>
                <div className="flex text-mine-shaft-400 items-center gap-1 text-lg">
                    <IconMapPin stroke={1.5} className="h-5 w-5" /> blr
                </div>
                <Divider size="xs" mx="xs" my="xl" className="bg-mine-shaft-700" />
                <div>
                    <Tabs variant="outline" radius="lg" defaultValue="about">
                        <Tabs.List className="[&_button]:!text-lg mb-5 font-semibold [&_button[data-active='true']]:text-bright-sun-400">
                            <Tabs.Tab value="about">About</Tabs.Tab>
                            <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
                            <Tabs.Tab value="employees">Employees</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="about"><AboutComp /></Tabs.Panel>
                        <Tabs.Panel value="jobs"><CompanyJobs /></Tabs.Panel>
                        <Tabs.Panel value="employees"><CompanyEmployees/></Tabs.Panel>
                    </Tabs>
                </div>
            </div>


        </div>
    )
}
export default Company;