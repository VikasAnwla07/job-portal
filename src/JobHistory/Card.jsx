import { Button, Divider, Text } from "@mantine/core";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconCalendarMonth,
  IconClockHour3,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";
import { changeProfile } from "../Slices/ProfileSlice";
import { getProfile, updateProfile } from "../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";

const Card = (props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
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
  return (
    <div
      className="bg-mine-shaft-900 p-4 w-72 flex flex-col gap-3 rounded-xl 
    hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400"
    >
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
          </div>
          <div>
            <div className="font-semibold">{props.jobTitle}</div>
            <div className="text-xs text-mine-shaft-300">
              {props.company} &#x2022;{" "}
              {props.applicants ? props.applicants.length : 0} Applicants{" "}
            </div>
          </div>
        </div>
        {profile.savedJobs?.includes(Number(props.id)) ? (
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

      <div className="flex gap-2 [&>div]:px-2 [&>div]:py-1 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        <div>{props.experience}</div>
        <div>{props.jobType}</div>
        <div>{props.location}</div>
      </div>
      <Text className="!text-xs !text-mine-shaft-200" lineClamp={3}>
        {props.about}
      </Text>
      <Divider size="xs" color="mineShaft.7" />
      <div className="flex justify-between">
        <div className="font-semibold text-mine-shaft-200">
          &#8377;{props.packageOffered} LPA
        </div>
        <div className="flex gap-2 text-xs text-mine-shaft-400 items-center">
          <IconClockHour3 className="h-5 w-5" stroke={1.5} />
          {props.applied || props.interviewing
            ? "Applied "
            : props.offered
            ? "Interviewed "
            : "Posted "}
          {timeAgo(props.postTime)}
        </div>
      </div>
      {(props.offered || props.interviewing) && (
        <Divider size="xs" color="mineShaft.7" />
      )}
      {props.offered && (
        <div className="flex gap-2">
          <Button color="brightSun.4" variant="outline" fullWidth>
            Accept
          </Button>
          <Button color="brightSun.4" variant="light" fullWidth>
            Reject
          </Button>
        </div>
      )}
      {props.interviewing && (
        <div className="flex gap-1 items-center text-sm">
          <IconCalendarMonth
            className="text-bright-sun-400 w-5 h-5"
            stroke={1.5}
          />
          Sun, 25 February &bull;
          <span className="text-mine-shaft-400">10:00 AM</span>
        </div>
      )}
      <Link to={`/jobs/${props.id}`}>
        <Button fullWidth color="brightSun.4" variant="outline">
          View Job
        </Button>
      </Link>
    </div>
  );
};
export default Card;
