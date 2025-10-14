import { ActionIcon, Button, Divider, TagsInput, Textarea } from "@mantine/core";
import { IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil, IconPlus } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { setConstantValue } from "typescript";
import ExpInput from "./ExpInput";
import CertiInput from "./CertiInput";

const Profile = (props: any) => {

    const select = fields;
    const [skills, setSkills] = useState(props.skills);
    const [about, setAbout] = useState(props.about);
    const [edit, setEdit] = useState([false, false, false, false, false]);
    const [addExp, setAddExp] = useState(false);
    const [addCerti, setAddCerti] = useState(false);
    const handleEdit = (index: number) => {
        const newEdit = [...edit];
        newEdit[index] = !newEdit[index];
        setEdit(newEdit);
    }
    return (
        <div className="w-4/5 mx-auto">
            <div className="relative">
                <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="Profile Background" />
                <img className="rounded-full h-48 w-48 -bottom-1/3 left-3 border-mine-shaft-950 border-8 absolute" src="/avatar.png" alt="Profile Picture" />
            </div>
            <div className="px-3 mt-20">
                <div className=" text-3xl font-semibold flex justify-between" >
                    {props.name}
                    <ActionIcon onClick={() => handleEdit(0)} size="lg" color="bright-sun.4" variant="subtle">
                        {edit[0] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                    </ActionIcon>
                </div>
                {
                    edit[0] ? (
                        <>
                            <div className="flex gap-10 [&>*]:w-1/2">
                                <SelectInput {...select[0]} />
                                <SelectInput {...select[1]} />
                            </div>
                            <SelectInput {...select[2]} />
                        </>
                    ) : (
                        <>
                            <div className="text-xl flex gap-1 items-center"><IconBriefcase stroke={1.5} className="h-5 w-5" />{props.role} &bull; {props.company}</div>
                            <div className="flex text-mine-shaft-400 items-center gap-1 text-lg">
                                <IconMapPin stroke={1.5} className="h-5 w-5" /> {props.location}
                            </div>
                        </>
                    )
                }

            </div>
            <Divider size="xs" mx="xs" my="xl" className="bg-mine-shaft-700" />
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3 flex justify-between">About
                    <ActionIcon onClick={() => handleEdit(1)} size="lg" color="bright-sun.4" variant="subtle">
                        {edit[1] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                    </ActionIcon>
                </div>
                {edit[1] ?
                    <Textarea autosize minRows={3} placeholder="Enter about yourslef...." value={about} onChange={(event) => setAbout(event.currentTarget.value)} />
                    :
                    <div className="text-sm text-mine-shaft-300 text-justify">
                        {about}
                    </div>
                }

            </div>

            <Divider size="xs" mx="xs" my="xl" className="bg-mine-shaft-700" />
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3 flex justify-between">Skills
                    <ActionIcon onClick={() => handleEdit(2)} size="lg" color="bright-sun.4" variant="subtle">
                        {edit[2] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                    </ActionIcon>
                </div>
                {
                    edit[2] ? <TagsInput value={skills} onChange={setSkills} placeholder="Add Skill" splitChars={[',', ' ', '|']} />
                        :
                        <div className="flex flex-wrap gap-2">
                            {
                                skills.map((skill: any, index: any) =>
                                    <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">{skill}</div>
                                )
                            }
                        </div>

                }

            </div>

            <Divider size="xs" mx="xs" my="xl" className="bg-mine-shaft-700" />
            <div className="px-3">
                <div className="text-2xl font-semibold mb-5 flex justify-between">Experience
                    <div className= "flex gap-2">
                        <ActionIcon onClick={() => setAddExp(true)} size="lg" color="bright-sun.4" variant="subtle">
                            <IconPlus className="h-4/5 w-4/5" />
                        </ActionIcon>
                        <ActionIcon onClick={() => handleEdit(3)} size="lg" color="bright-sun.4" variant="subtle">
                            {edit[3] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                        </ActionIcon>
                    </div>

                </div>
                <div className="flex flex-col gap-8">
                    {
                        props.experience.map((exp: any, index: any) =>
                            <ExpCard key={index} {...exp} edit={edit[3]} />
                        )
                    }
                    {addExp && <ExpInput add setEdit={setAddExp} />}
                </div>


            </div>

            <Divider size="xs" mx="xs" my="xl" className="bg-mine-shaft-700" />
            <div className="px-3">
                <div className="text-2xl font-semibold mb-5 flex justify-between">Certifications
                    <div className= "flex gap-2">
                        <ActionIcon onClick={() => setAddCerti(true)} size="lg" color="bright-sun.4" variant="subtle">
                            <IconPlus className="h-4/5 w-4/5" />
                        </ActionIcon>
                        <ActionIcon onClick={() => handleEdit(4)} size="lg" color="bright-sun.4" variant="subtle">
                            {edit[4] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                        </ActionIcon>
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    {
                        props.certifications.map((certi: any, index: any) =>
                            <CertiCard key={index} edit={edit[4]} {...certi} />
                        )
                    }
                    {
                        addCerti &&<CertiInput setEdit={setAddCerti} />
                    }
                </div>
            </div>
        </div>
    )
}
export default Profile;