import { Divider, Input, RangeSlider } from "@mantine/core";
import { dropdownData } from "../Data/JobsData";
import { useState } from "react";
import MultiInput from "../FindJobs/MultiInput";
import { searchFields } from "../Data/TalentData";
import { IconUserCircle } from "@tabler/icons-react";

const SearchBar = () => {
    const [value, setValue] = useState<[number, number]>([1, 100]);
    return (
        <div className="flex px-5 py-8 item-center !text-mine-shaft-100">
            <div className="flex items-center">
                <div className="text-bright-sun-400 p-1 !bg-mine-shaft-900 mt-0.5 rounded-full mr-2">
                    <IconUserCircle size={23} />
                </div>
                <Input className="[&_input]:!placeholder-mine-shaft-300" variant="unstyled" placeholder = "Talent Name" />
            </div>

            {
                searchFields.map((item, index) =>
                    <>
                        <div key={index} className="w-1/5">
                            <MultiInput {...item} />
                        </div>
                        <Divider mr="xs" size="xs" orientation="vertical" className="bg-mine-shaft-700 mx-3" />
                    </>
                )
            }
            <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
            <div className="flex text-sm justify-between">
                <div>Salary</div>
                <div>${value[0]} LPA - ${value[1]} LPA</div>
            </div>
                <RangeSlider
                    size="xs"
                    value={value}
                    onChange={setValue}
                    labelTransitionProps={{transition: 'skew-down', duration: 150, timingFunction: 'linear'}}
                    styles={{
                        track: { backgroundColor: "#3d3d3d" }, 
                        bar: { backgroundColor: "#ffbd20" },
                        thumb: { backgroundColor: "#ffbd20", borderColor: "#ffbd20" }
                    }}
                />
            </div>
        </div>
    )
}
export default SearchBar;