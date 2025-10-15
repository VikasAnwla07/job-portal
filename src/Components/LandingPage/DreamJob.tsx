import { Avatar, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const DreamJob = () => {
    return (
        <div className="flex items-center px-16">
            <div className="flex flex-col w-[45%] gap-3">
                <div className="text-6xl font-bold leading-tight text-mine-shaft-100 [&>span]:text-bright-sun-400">Find your <span>Dream</span> <span>Job</span> with us</div>
                <div className="text-lg text-mine-shaft-200">Good life begins with a good company. Start explore thousand of jobs in one place.</div>
                <div className="flex gap-3 mt-5">
                    <TextInput className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100" variant="unstyled" label="Job Type" placeholder="Fulltime" />
                    <TextInput className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100" variant="unstyled" label="Job Title" placeholder="Software Engineer" />
                    <div className="flex items-center justify-center h-full w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-lg p-2 hover:bg-bright-sun-500 cursor-pointer">
                        <IconSearch className="h-[85%] w-[85%]" />
                    </div>
                </div>
            </div>
            <div className="w-[55%] flex items-center justify-center">
                <div className="w-[30rem] relative">
                    <img src="Boy.png" alt="boy" />
                    <div className="absolute top-[50%] -right-10 w-fit border-bright-sun-400 border rounded-lg p-1.5 backdrop-blur-md">
                        <div className="text-center mb-1 text-sm text-mine-shaft-100">10K+ got job</div>
                        <Avatar.Group>
                            <Avatar src="Avatar.png" />
                            <Avatar src="Avatar1.png" />
                            <Avatar src="Avatar2.png" />
                            <Avatar>10K+</Avatar>
                        </Avatar.Group>
                    </div>
                    <div className="absolute top-[28%] -left-5 w-fit border-bright-sun-400 border rounded-lg p-1.5 backdrop-blur-md gap-3 flex flex-col">
                        <div className="flex gap-2 items-center">
                            <div className="w-10 h-10 p-1 bg-mine-shaft-900 rounded-lg">
                                <img src="Google.png" alt="Google" />
                            </div>
                            <div className="text-sm text-mine-shaft-100">
                                <div> Software Engineer </div>
                                <div className="text-mine-shaft-200 text-xs">Banglore</div>
                            </div>

                        </div>
                        <div className="flex gap-2 text-mine-shaft-200 justify-around text-xs">
                            <span>1 day ago</span>
                            <span> 120 Applications</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DreamJob;