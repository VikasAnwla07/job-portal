import { Button } from "@mantine/core";
import { useState } from "react";
import ExpInput from "./ExpInput";
import { formateDate } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { updateProfile, getProfile } from "../Services/ProfileService";

const ExpCard = (props) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const handleDelete = async () => {
    let exp = [...profile.experiences]; // fixed typo: should be experiences
    exp.splice(props.index, 1);
    let updatedProfile = { ...profile, experiences: exp };
    try {
      await updateProfile(updatedProfile); // Save to backend
      const freshProfile = await getProfile(profile.id); // Refetch
      dispatch(setProfile(freshProfile));
      successNotification("Success", "Experience deleted successfully");
    } catch (error) {
      successNotification("Error", "Failed to delete experience");
    }
  };

  return !edit ? (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold">{props.title}</div>
            <div className="text-sm text-mine-shaft-300">
              {props.company} &#x2022; {props.location}
            </div>
          </div>
        </div>
        <div className="text-sm text-mine-shaft-300">
          {formateDate(props.startDate)} -{" "}
          {props.working ? "Present" : formateDate(props.endDate)}
        </div>
      </div>
      <div className="text-sm text-mine-shaft-300 text-justify">
        {props.description}
      </div>
      {props.edit && (
        <div className="flex gap-5">
          <Button
            onClick={() => setEdit(true)}
            color="brightSun.4"
            variant="outline"
          >
            Edit
          </Button>
          <Button onClick={handleDelete} color="red.8" variant="light">
            Delete
          </Button>
        </div>
      )}
    </div>
  ) : (
    <ExpInput {...props} setEdit={setEdit} />
  );
};
export default ExpCard;
