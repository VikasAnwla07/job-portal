import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  FileInput,
  Overlay,
  TagsInput,
  Textarea,
} from "@mantine/core";
import {
  IconBriefcase,
  IconDeviceFloppy,
  IconEdit,
  IconMapPin,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import ExpInput from "./ExpInput";
import CertiInput from "./CertiInput";
import { use } from "react";
import { getProfile, updateProfile } from "../Services/ProfileService";
import Info from "./Info";
import { setProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import { profile as defaultProfile } from "../Data/TalentData";
import Certificate from "./Certificate";
import { useHover } from "@mantine/hooks";
import { successNotification } from "../Services/NotificationService";
import { getBase64 } from "../Services/Utilities";

// Utility to format date fields
const formatDate = (date) => {
  if (!date) return null;
  if (typeof date === "string") {
    // Try to parse "Aug 2023" to a Date object
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
    // fallback: try Date constructor
    const d = new Date(date);
    if (!isNaN(d)) {
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-01T00:00:00`;
    }
    return null;
  }
  // If already a Date object
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-01T00:00:00`;
};

// Utility to sanitize all date fields in profile object
const sanitizeProfileDates = (profileObj) => {
  const sanitized = { ...profileObj };

  // Sanitize experiences
  if (Array.isArray(sanitized.experiences)) {
    sanitized.experiences = sanitized.experiences.map((exp) => ({
      ...exp,
      startDate: formatDate(exp.startDate),
      endDate: formatDate(exp.endDate),
    }));
  }

  // Sanitize certifications
  if (Array.isArray(sanitized.certifications)) {
    sanitized.certifications = sanitized.certifications.map((cert) => ({
      ...cert,
      issueDate: formatDate(cert.issueDate),
      expiryDate: cert.expiryDate ? formatDate(cert.expiryDate) : undefined,
    }));
  }

  return sanitized;
};

const Profile = (props) => {
  const select = fields;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getProfile(user.id)
      .then(async (data) => {
        const isEmpty =
          (!data.jobTitle || data.jobTitle.trim() === "") &&
          (!data.company || data.company.trim() === "") &&
          (!data.location || data.location.trim() === "") &&
          (!data.about || data.about.trim() === "") &&
          (!data.skills || data.skills.length === 0) &&
          (!data.experiences || data.experiences.length === 0) &&
          (!data.certifications || data.certifications.length === 0);

        if (isEmpty) {
          // Only send allowed fields to backend, including nested fields
          const allowedFields = [
            "id",
            "email",
            "jobTitle",
            "company",
            "location",
            "about",
            "skills",
            "experiences",
            "certifications",
          ];
          const allowedExperienceFields = [
            "title",
            "company",
            "location",
            "startDate",
            "endDate",
            "description",
            "working",
          ];
          const allowedCertificationFields = [
            "name",
            "issuer",
            "issueDate",
            "certificateId",
          ];

          const filledProfile = {};
          allowedFields.forEach((key) => {
            if (key in defaultProfile) filledProfile[key] = defaultProfile[key];
          });
          filledProfile.id = data.id;
          filledProfile.email = data.email;

          // Deep sanitize experiences and convert date strings
          if (Array.isArray(filledProfile.experiences)) {
            filledProfile.experiences = filledProfile.experiences.map((exp) => {
              const cleanExp = {};
              allowedExperienceFields.forEach((field) => {
                if (field in exp) {
                  cleanExp[field] = exp[field];
                }
              });
              // Format dates
              cleanExp.startDate = formatDate(cleanExp.startDate);
              cleanExp.endDate = formatDate(cleanExp.endDate);
              return cleanExp;
            });
          }

          // Deep sanitize certifications
          if (Array.isArray(filledProfile.certifications)) {
            filledProfile.certifications = filledProfile.certifications.map(
              (cert) => {
                const cleanCert = {};
                allowedCertificationFields.forEach((field) => {
                  if (field in cert) cleanCert[field] = cert[field];
                });
                // Format dates
                cleanCert.issueDate = formatDate(cleanCert.issueDate);
                if (cleanCert.expiryDate)
                  cleanCert.expiryDate = formatDate(cleanCert.expiryDate);
                return cleanCert;
              }
            );
          }

          // Final sanitize before update
          const sanitizedProfile = sanitizeProfileDates(filledProfile);

          await updateProfile(sanitizedProfile);
          dispatch(setProfile(sanitizedProfile));
        } else {
          // Always sanitize before setting profile from backend
          const sanitizedProfile = sanitizeProfileDates(data);
          dispatch(setProfile(sanitizedProfile));
        }
      })
      .catch((error) => {
        dispatch(setProfile(defaultProfile));
      });
  }, [user.id, dispatch]);

  const [edit, setEdit] = useState([false, false, false, false, false]);
  const [addExp, setAddExp] = useState(false);
  const [addCerti, setAddCerti] = useState(false);

  const handleEdit = (index) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
  };
  const { hovered, ref } = useHover();
  const profile = useSelector((state) => state.profile);
  const handleFileChange = async (image) => {
    try {
      const picture = await getBase64(image);
      const base64Data = picture.split(",")[1]; // remove "data:image/jpeg;base64,"

      const updatedProfile = {
        ...profile,
        picture: base64Data,
      };

      await updateProfile(updatedProfile); // Save to DB
      dispatch(setProfile(updatedProfile)); // Update local state

      successNotification("Success", "Profile picture updated successfully");
    } catch (error) {
      successNotification("Error", "Failed to upload picture");
    }
  };

  return (
    <div className="w-4/5 mx-auto">
      <div className="relative">
        <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
        <div
          ref={ref}
          className=" flex items-center justify-center absolute -bottom-1/3 left-3"
        >
          <Avatar
            className="!h-48 !w-48 rounded-full border-8
            border-mine-shaft-950"
            src={
              profile.picture
                ? `data:image/jpeg;base64,${profile.picture}`
                : "/avatar.png"
            }
            alt=""
          />
          {hovered && (
            <Overlay
              className="!rounded-full"
              color="#000"
              backgroundOpacity={0.75}
            />
          )}
          {hovered && <IconEdit className="absolute z-[300] w-10 h-10" />}
          {hovered && (
            <FileInput
              onChange={handleFileChange}
              className="absolute  z-[301] [&_*]:!rounded-full [&_*]:!h-full h-full w-full "
              variant="transparent"
              accept="image/png,image/jpeg"
            />
          )}
        </div>
      </div>
      <div className="px-3 mt-20">
        <Info />
      </div>

      <Divider mx={"xs"} my={"xl"} />
      <About />
      <Divider mx={"xs"} my={"xl"} />

      <Skills />

      <Divider mx={"xs"} my={"xl"} />
      <Experience />
      <Divider mx={"xs"} my={"xl"} />
      <Certificate />
    </div>
  );
};
export default Profile;
