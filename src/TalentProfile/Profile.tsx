import { Button, Divider } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";

const Profile = (props: any) => {
    return (
        <div className="w-2/3">
            <div className="relative">
                <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="Profile Background" />
                <img className="rounded-full h-48 w-48 -bottom-1/3 left-3 border-mine-shaft-950 border-8 absolute" src="/avatar.png" alt="Profile Picture" />
            </div>
            <div className="px-3 mt-16">
                <div className="text-3xl font-semibold flex justify-between" >
                    {props.name}
                    <Button className="!text-bright-sun-400 !bg-[#554a2e]" variant="light">
                        Message
                    </Button>
                </div>
                <div className="text-xl flex gap-1 items-center"><IconBriefcase stroke={1.5} className="h-5 w-5" />{props.role} &bull; {props.company}</div>
                <div className="flex text-mine-shaft-400 items-center gap-1 text-lg">
                    <IconMapPin stroke={1.5} className="h-5 w-5" /> {props.location}
                </div>
            </div>
            <Divider size="xs" mx="xs" my="xl" className="bg-mine-shaft-700" />
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3">About</div>
                <div className="text-sm text-mine-shaft-300 text-justify">
                    {props.about}
                </div>
            </div>

            <Divider size="xs" mx="xs" my="xl" className="bg-mine-shaft-700" />
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3">Skills</div>
                <div className="flex flex-wrap gap-2">
                    {
                        props.skills.map((skill: any, index: any) =>
                            <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">{skill}</div>
                        )
                    }
                </div>
            </div>

            <Divider size="xs" mx="xs" my="xl" className="bg-mine-shaft-700" />
            <div className="px-3">
                <div className="text-2xl font-semibold mb-5">Experience</div>
                <div className="flex flex-col gap-8">
                    {
                        props.experience.map((exp: any, index: any) =>
                            <ExpCard key={index} {...exp} />
                        )
                    }
                </div>


            </div>

            <Divider size="xs" mx="xs" my="xl" className="bg-mine-shaft-700" />
            <div className="px-3">
                <div className="text-2xl font-semibold mb-5">Certifications</div>
                <div className="flex flex-col gap-8">
                    {
                        props.certifications.map((certi: any, index: any) =>
                            <CertiCard key={index} {...certi} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default Profile;