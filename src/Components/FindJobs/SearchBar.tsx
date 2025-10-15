import { Divider, RangeSlider } from "@mantine/core";
import { dropdownData } from "../../Data/JobsData";
import MultiInput from "./MultiInput";
import { useState } from "react";

const SearchBar = () => {
    const [value, setValue] = useState<[number, number]>([1, 100]);
    return (
        <div className="flex px-5 py-8 item-center !text-mine-shaft-100">
            {
                dropdownData.map((item, index) =>
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