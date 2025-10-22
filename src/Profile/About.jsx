import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { updateProfile, getProfile } from "../Services/ProfileService";

const About = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (profile.about && profile.about.trim().length > 0) {
      setAbout(profile.about);
    } else {
      setAbout(
        "As a Software Engineer at Google, I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies to deliver seamless user experiences. With a strong foundation in React and SpringBoot, and a focus on MongoDB for database solutions, I am passionate about leveraging the latest technologies to solve complex problems and drive innovation. My goal is to create impactful software that enhances productivity and meets user needs effectively."
      );
    }
  }, [profile.about]);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleSave = async () => {
    if (!about) {
      successNotification("Error", "About field is required");
      return;
    }
    // Only update the about field
    let updatedProfile = { ...profile, about: about };
    try {
      await updateProfile(updatedProfile);
      const freshProfile = await getProfile(profile.id);
      dispatch(setProfile(freshProfile));
      successNotification("Success", "About updated successfully");
      setEdit(false);
    } catch (error) {
      successNotification("Error", "Failed to update About");
    }
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        About
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
        <Textarea
          value={about}
          autosize
          minRows={3}
          placeholder="Enter about yourself..."
          onChange={(event) => setAbout(event.currentTarget.value)}
        />
      ) : (
        <div className="text-sm text-mine-shaft-400 text-justify">{about}</div>
      )}
    </div>
  );
};

export default About;
