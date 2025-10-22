import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { successNotification } from "../Services/NotificationService";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateProfile, getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";

const Skills = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (Array.isArray(profile.skills)) {
      setSkills(profile.skills);
    }
  }, [profile.skills]);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const formatDate = (date) => {
    if (!date) return null;
    if (typeof date === "string") {
      const [monthStr, yearStr] = date.split(" ");
      const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ].indexOf(monthStr);
      if (month !== -1 && yearStr) {
        return `${yearStr}-${String(month + 1).padStart(2, "0")}-01T00:00:00`;
      }
      const d = new Date(date);
      if (!isNaN(d)) {
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
          2,
          "0"
        )}-01T00:00:00`;
      }
      return null;
    }
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-01T00:00:00`;
  };

  const sanitizeProfileDates = (profileObj) => {
    const sanitized = { ...profileObj };
    if (Array.isArray(sanitized.experiences)) {
      sanitized.experiences = sanitized.experiences.map((exp) => ({
        ...exp,
        startDate: formatDate(exp.startDate),
        endDate: formatDate(exp.endDate),
      }));
    }
    if (Array.isArray(sanitized.certifications)) {
      sanitized.certifications = sanitized.certifications.map((cert) => ({
        ...cert,
        issueDate: formatDate(cert.issueDate),
        expiryDate: cert.expiryDate ? formatDate(cert.expiryDate) : undefined,
      }));
    }
    return sanitized;
  };

  const handleSave = async () => {
    if (!skills || skills.length === 0) {
      successNotification("Error", "Please add at least one skill");
      return;
    }
    // Only update the skills array
    let updatedProfile = { ...profile, skills };
    updatedProfile = sanitizeProfileDates(updatedProfile);

    try {
      await updateProfile(updatedProfile);
      const freshProfile = await getProfile(profile.id);
      dispatch(setProfile(freshProfile));
      successNotification("Success", "Skills updated successfully");
      setEdit(false);
    } catch (error) {
      successNotification("Error", "Failed to update Skills");
    }
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        Skills{" "}
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
        <TagsInput
          value={skills}
          onChange={setSkills}
          placeholder="Add skills"
          splitChars={[",", " ", "|"]}
        />
      ) : skills && skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400
        px-3 py-1"
            >
              {skill}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-mine-shaft-400">No skills added yet</div>
      )}
    </div>
  );
};

export default Skills;
