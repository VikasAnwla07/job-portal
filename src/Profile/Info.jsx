import { ActionIcon, NumberInput } from "@mantine/core";
import {
  IconBriefcase,
  IconCheck,
  IconPencil,
  IconX,
  IconMapPin,
} from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { updateProfile, getProfile } from "../Services/ProfileService";

const Info = (props) => {
  const select = fields;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const [edit, setEdit] = useState(false);

  const form = useForm({
    mode: "controlled",
    initialValues: { jobTitle: "", company: "", location: "", totalExp:1 },
  });

  const handleEdit = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({
        jobTitle: profile.jobTitle,
        company: profile.company,
        location: profile.location,
        totalExp: profile.totalExp
      });
    } else {
      setEdit(false);
    }
  };

  const handleSave = async () => {
    let updatedProfile = { ...profile, ...form.getValues() };
    try {
      await updateProfile(updatedProfile); // Save to backend
      const freshProfile = await getProfile(profile.id); // Refetch
      dispatch(setProfile(freshProfile));
      successNotification("Success", "Profile Updated Successfully");
      setEdit(false);
    } catch (error) {
      successNotification("Error", "Failed to update profile");
    }
  };

  return (
    <>
      <div className="text-3xl font-semibold flex justify-between">
        {user.name}
        <div>
          {edit && (
            <ActionIcon
              onClick={handleSave}
              variant="subtle"
              size="lg"
              color="green.4"
            >
              <IconCheck className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>
          )}
          <ActionIcon
            onClick={handleEdit}
            variant="subtle"
            size="lg"
            color={edit ? "red.8" : "brightSun.4"}
          >
            {edit ? (
              <IconX className="h-4/5 w-4/5" stroke={1.5} />
            ) : (
              <IconPencil className="h-4/5 w-4/5" stroke={1.5} />
            )}
          </ActionIcon>
        </div>
      </div>
      {edit ? (
        <>
          <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput form={form} name="jobTitle" {...select[0]} />
            <SelectInput form={form} name="company" {...select[1]} />
          </div>
          <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="location" {...select[2]} />
          <NumberInput withAsterisk label="Experience" hideControls clampBehavior="strict" {...form.getInputProps('totalExp')} />
          </div>
        </>
      ) : (
        <>
          <div className="text-xl flex gap-1 items-center">
            <IconBriefcase className="h-5 w-5" stroke={1.5} />{" "}
            {profile.jobTitle && profile.jobTitle.trim().length > 0
              ? profile.jobTitle
              : "Job Title not set"}{" "}
            &bull;{" "}
            {profile.company && profile.company.trim().length > 0
              ? profile.company
              : "Company not set"}
          </div>
          <div className="flex gap-1 text-lg text-mine-shaft-300 items-center">
            <IconMapPin className="h-5 w-5" stroke={1.5} />{" "}
            {profile.location && profile.location.trim().length > 0
              ? profile.location
              : "Location not set"}
          </div>
          <div className="flex gap-1 text-lg text-mine-shaft-300 items-center">
            <IconBriefcase className="h-5 w-5" stroke={1.5} />{" "}
            Experience: {profile.totalExp} Years
             
          </div>
        </>
      )}
    </>
  );
};
export default Info;
