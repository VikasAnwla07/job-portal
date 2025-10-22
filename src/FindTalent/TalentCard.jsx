import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfile } from "../Services/ProfileService";
import { use } from "react";
import { changeAppStatus } from "../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { formateInterviewTime, openBase64Pdf } from "../Services/Utilities";

const jobCard = (props) => {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [app, { open: openApp, close: closeAppp }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    if (props.applicantId) {
      getProfile(props.applicantId)
        .then((res) => {
          setProfile(res);
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
        });
    } else {
      setProfile(props);
    }
  }, [props]);
  const handleOffer = (status) => {
    let interview = { id, applicantId: profile?.id, applicationStatus: status };
    if (status == "INTERVIEWING") {
      const [hours, minutes] = time.split(":").map(Number);
      date?.setHours(hours, minutes);
      interview = { ...interview, interviewTime: date };
    }
    changeAppStatus(interview)
      .then((res) => {
        if (status == "INTERVIEWING") {
          successNotification(
            "Interview Scheduled",
            "Interview Scheduled Successfully"
          );
        } else if (status == "OFFERED") {
          successNotification("Accepted", "Offer had been sent Successfully");
        } else {
          successNotification("Rejected", "Applicant had been Rejected");
        }
        window.location.reload();
      })
      .catch((err) => {
        errorNotification("Error", err.response.data.errorMessage);
        console.log(err);
      });
  };
  return (
    <div
      className="bg-mine-shaft-900 p-4 w-96 flex flex-col gap-3 rounded-xl 
    hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400"
    >
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-full">
            <Avatar
              size={"lg"}
              src={
                profile?.picture
                  ? `data:image/jpeg;base64,${profile?.picture}`
                  : "/avatar.png"
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-lg">{profile?.name || props.name}</div>
            <div className="text-sm text-mine-shaft-300">
              {profile?.jobTitle} &#x2022; {profile?.company}{" "}
            </div>
          </div>
        </div>
        <IconHeart className="text-mine-shaft-300 cursor-pointer" />
      </div>

      <div className="flex gap-2 [&>div]:px-2 [&>div]:py-1 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        {Array.isArray(profile.skills) &&
          profile.skills.map(
            (data, index) => index < 4 && <div key={index}>{data}</div>
          )}
      </div>
      <Text className="!text-xs !text-mine-shaft-200" lineClamp={3}>
        {profile.about}
      </Text>
      <Divider size="xs" color="mineShaft.7" />
      {props.invited ? (
        <div className="flex gap-1 items-center text-sm text-mine-shaft-200">
          <IconCalendarMonth stroke={1.5} />
          Interview: {formateInterviewTime(props.interviewTime)}
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="text-mine-shaft-300">
            Exp: {props.totalExp ? props.totalExp : 1} Years
          </div>
          <div className="flex gap-2 text-xs text-mine-shaft-400 items-center">
            <IconMapPin className="h-5 w-5" stroke={1.5} /> {profile.location}
          </div>
        </div>
      )}
      <Divider size="xs" color="mineShaft.7" />
      <div className="flex [&>*]:w-1/2 [&>*]:p-1">
        {!props.invited && (
          <>
            <Link to={`/talent-profile/${profile.id}`}>
              <Button color="brightSun.4" variant="outline" fullWidth>
                Profile
              </Button>
            </Link>

            <div>
              {props.posted ? (
                <Button
                  onClick={open}
                  rightSection={<IconCalendarMonth className="h-5 w-5" />}
                  color="brightSun.4"
                  variant="light"
                  fullWidth
                >
                  Schedule
                </Button>
              ) : (
                <Button color="brightSun.4" variant="light" fullWidth>
                  Message
                </Button>
              )}
            </div>
          </>
        )}
        {props.invited && (
          <>
            <div>
              <Button
                onClick={() => handleOffer("OFFERED")}
                color="brightSun.4"
                variant="outline"
                fullWidth
              >
                Accept
              </Button>
            </div>
            <div>
              <Button
                onClick={() => handleOffer("REJECTED")}
                color="brightSun.4"
                variant="light"
                fullWidth
              >
                Reject
              </Button>
            </div>
          </>
        )}
      </div>
      {(props.invited || props.posted) && (
        <Button
          onClick={openApp}
          color="brightSun.4"
          variant="filled"
          fullWidth
          autoContrast
        >
          View Application
        </Button>
      )}
      <Modal
        opened={opened}
        onClose={close}
        title="Schedule Interview"
        centered
      >
        <div className="flex flex-col gap-4">
          <DateInput
            minDate={new Date()}
            value={date}
            onChange={setDate}
            label="Date"
            placeholder="Enter Date"
          />
          <TimeInput
            label="Time"
            value={time}
            onChange={(event) => {
              setTime(event.currentTarget.value);
            }}
            ref={ref}
            onClick={() => ref.current?.showPicker()}
          />
          <Button
            onClick={() => handleOffer("INTERVIEWING")}
            color="brightSun.4"
            variant="light"
            fullWidth
          >
            Schedule
          </Button>
        </div>
      </Modal>
      <Modal opened={app} onClose={closeAppp} title="Application" centered>
        <div className="flex flex-col gap-4">
          <div>
            Email: &emsp;
            <a
              className="text-bright-sun-400 hover:underline text-center cursor-pointer"
              href={`mailto:${props.email}`}
            >
              {props.email}
            </a>
          </div>
          <div>
            Website: &emsp;
            <a
              target="_blank"
              className="text-bright-sun-400 hover:underline text-center cursor-pointer"
              href={props.website}
            >
              {props.website}
            </a>
          </div>
          <div>
            Resume: &emsp;
            <span
              className="text-bright-sun-400 hover:underline text-center cursor-pointer"
              onClick={() => openBase64Pdf(props.resume)}
            >
              {props.name}
            </span>
          </div>
          <div>
            Cover Letter: &emsp;<div>{props.coverLetter}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default jobCard;
