import { ActionIcon, Button, Divider } from "@mantine/core";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconMapPin,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { card, desc, skills } from "../Data/JobDescData";
import DOMPurify from "dompurify";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../Services/ProfileService";
import { changeProfile } from "../Slices/ProfileSlice";
import { useEffect, useState } from "react";
import { use } from "react";
import { postJob } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";
const JobDesc = (props) => {
  const data = DOMPurify.sanitize(props.description);
  const dispatch = useDispatch();
  const [applied, setApplied] = useState(false);
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const handleSaveJob = async () => {
    // Ensure job IDs are numbers for backend compatibility
    const jobId = Number(props.id);
    let savedJobs = Array.isArray(profile.savedJobs)
      ? [...profile.savedJobs]
      : [];
    if (savedJobs.includes(jobId)) {
      savedJobs = savedJobs.filter((id) => id !== jobId);
    } else {
      savedJobs = [...savedJobs, jobId];
    }
    let updatedProfile = { ...profile, savedJobs, id: profile.id };

    //Sanitize all date fields before update (prevents backend errors)
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

    updatedProfile = sanitizeProfileDates(updatedProfile);

    try {
      await updateProfile(updatedProfile); // Save to backend
      const freshProfile = await getProfile(profile.id); // Refetch
      dispatch(changeProfile(freshProfile)); // Update Redux
    } catch (error) {
      // Optionally show a notification
    }
  };
  useEffect(() => {
    if (
      props.applicants?.filter((applicant) => applicant.applicantId == user.id)
        .length > 0
    ) {
      setApplied(true);
    } else {
      setApplied(false);
    }
  }, [props]);
  const handleClose = () => {
    postJob({
      ...props, jobStatus:"CLOSED"}).then((res)=>{
        successNotification("Success","Job Closed Successfully");
      }).catch((err)=>{
        errorNotification("Error", err.response.data.errorMessage);
      })
  }
  return (
    <div className="w-2/3">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-mine-shaft-800 rounded-xl">
            <img className="h-14" src={`/Icons/${props.company}.png`} alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-2xl">{props.jobTitle}</div>
            <div className="text-lg text-mine-shaft-300">
              {props.company} &#x2022; {timeAgo(props.postTime)} &#x2022;{" "}
              {props.applicants ? props.applicants.length : 0} Applicants{" "}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          {(props.edit || !applied) && (
            <Link to={props.edit?`/post-job/${props.id}`:`/apply-job/${props.id}`}>
              <Button color="brightSun.4" size="sm" variant="light">
                {props.closed?"Reopen":props.edit ? "Edit" : "Apply"}
              </Button>
            </Link>
          )}
          {!props.edit && applied && (
            <Button color="green.8" size="sm" variant="light">
              Applied
            </Button>
          )}
          {props.edit && !props.closed ? (
            <Button onClick={handleClose} color="red.5" size="sm" variant="outline">
              Close
            </Button>
          ) : profile.savedJobs?.includes(Number(props.id)) ? (
            <IconBookmarkFilled
              onClick={handleSaveJob}
              className="cursor-pointer text-bright-sun-400"
            />
          ) : (
            <IconBookmark
              onClick={handleSaveJob}
              className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400"
            />
          )}
        </div>
      </div>
      <Divider my="xl" />
      <div className="flex justify-between">
        {card.map((item, index) => (
          <div key={"index"} className="flex flex-col items-center gap-1">
            <ActionIcon
              color="brightSun.4"
              className="!h-12 !w-12"
              variant="light"
              radius="xl"
              aria-label="Settings"
            >
              <item.icon className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>
            <div className="text-sm text-mine-shaft-300">{item.name}</div>
            <div className="font-semibold">
              {props ? props[item.id] : "NA"}
              {item.id == "packageOffered" && <> LPA</>}
            </div>
          </div>
        ))}
      </div>
      <Divider my="xl" />
      <div>
        <div className="text-xl font-semibold mb-5">Required Skills</div>
        <div className="flex flex-wrap gap-2">
          {props?.skillsRequired?.map((item, index) => (
            <ActionIcon
              color="brightSun.4"
              className="!h-fit !w-fit font-medium !text-sm"
              p="xs"
              variant="light"
              radius="xl"
              aria-label="Settings"
            >
              {" "}
              {item}
            </ActionIcon>
          ))}
        </div>
      </div>
      <Divider my="xl" />
      <div
        className="[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify [&_li]:marker:text-bright-sun-400
      [&_li]:mb-1"
        dangerouslySetInnerHTML={{ __html: data }}
      ></div>
      <Divider my="xl" />
      <div>
        <div className="text-xl font-semibold mb-5">About Company</div>
        <div className="flex justify-between mb-3">
          <div className="flex gap-2 items-center">
            <div className="p-3 bg-mine-shaft-800 rounded-xl">
              <img className="h-8" src={`/Icons/${props.company}.png`} alt="" />
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-lg">{props.company}</div>
              <div className="text-mine-shaft-300"> 10K+ Employees</div>
            </div>
          </div>
          <Link to={`/company/${props.company}`}>
            <Button color="brightSun.4" variant="light">
              Company Page
            </Button>
          </Link>
        </div>
        <div className="text-mine-shaft-300 text-justify">{props.about}</div>
      </div>
    </div>
  );
};
export default JobDesc;
