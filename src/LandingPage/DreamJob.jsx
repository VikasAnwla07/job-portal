import { Avatar, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const DreamJob = ()=>{
    return( 
    <div className="flex items-center px-16">
        <div id="left-panel" className="flex flex-col w-[45%] gap-3">
            <div className="text-5xl font-semibold text-mine-shaft-100 leading-tight">Find your <span className="text-bright-sun-300">dream job</span> with us</div>
            <div className="text-lg text-mine-shaft-200">Good life begins with a big company. Start explore thousands of job in one place.</div>
            <div className="flex gap-3 mt-5">
            <TextInput className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:text-mine-shaft-100" variant="unstyled" label="Job Title" placeholder="Software Engineer"/>
            <TextInput className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:text-mine-shaft-100" variant="unstyled" label="Job Type" placeholder="Fulltime"/>
            <div className="flex items-center justify-center h-full w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-lg p-2 hover:bg-bright-sun-500 cursor-pointer">
                <IconSearch className="h-[85%] w-[85%]"/>

            </div>
            </div>
        </div>
        <div id="right-panel" className="w-[55%] flex items-center justify-center">
            <div className="w-[30rem] relative">
                <img src="/Boy.png" alt="boy" />
                <div className="absolute -right-10 w-fit top-[50%] border border-bright-sun-400 rounded-lg p-2 backdrop-blur-md">
                    <div className="text-center text-sm mb-1 text-mine-shaft-100">10k+ got job</div>
                <Avatar.Group>
                       <Avatar src="avatar.png" />
                       <Avatar src="avatar1.png" />
                       <Avatar src="avatar2.png" />
                       <Avatar>+9k</Avatar>
                </Avatar.Group>
                </div>
                <div className="absolute -left-5 w-fit top-[26%] border border-bright-sun-400 rounded-lg p-2 backdrop-blur-md flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <div className="w-10 h-10 p-1 bg-mine-shaft-900 rounded-lg">
                            <img src="/Google.png" alt="" />
                        </div>
                        <div className="text-sm text-mine-shaft-100">
                            <div>Software Engineer</div>
                            <div className="text-mine-shaft-300 text-xs">New Delhi</div>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-around text-mine-shaft-200 text-xs">
                        <span>1 day ago</span>
                        <span>120 Applicants</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default DreamJob;