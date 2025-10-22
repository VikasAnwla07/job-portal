import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { updateProfile, getProfile } from "../Services/ProfileService";

const CertiCard = (props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const handleDelete = async () => {
    let certs = [...profile.certifications];
    certs.splice(props.index, 1);
    let updatedProfile = { ...profile, certifications: certs };
    try {
      await updateProfile(updatedProfile); // Save to backend
      const freshProfile = await getProfile(profile.id); // Refetch
      dispatch(setProfile(freshProfile));
      successNotification("Success", "Certification deleted successfully");
    } catch (error) {
      successNotification("Error", "Failed to delete certification");
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <div className="p-2 bg-mine-shaft-800 rounded-md">
          <img className="h-7" src={`/Icons/${props.issuer}.png`} alt="" />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">{props.name}</div>
          <div className="text-sm text-mine-shaft-300">{props.issuer}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end">
          <div className="text-sm text-mine-shaft-300">
            {props.issueDate &&
              new Date(props.issueDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long", // 👈 shows 'July' instead of 'Jul'
              })}
          </div>

          <div className="text-sm text-mine-shaft-300">
            {props.certificateId}
          </div>
        </div>
        {props.edit && (
          <ActionIcon
            size="lg"
            color="red.8"
            variant="subtle"
            onClick={handleDelete}
          >
            <IconTrash className="h-4/5 w-4/5" stroke={1.5} />
          </ActionIcon>
        )}
      </div>
    </div>
  );
};
export default CertiCard;
