import { Button, TextInput } from "@mantine/core";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { updateProfile, getProfile } from "../Services/ProfileService";
import { isNotEmpty, useForm } from "@mantine/form";

const CertiInput = (props) => {
  const select = fields;
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      issuer: "",
      issueDate: new Date(),
      certificateId: "",
    },
    validate: {
      name: isNotEmpty("Title is required"),
      issuer: isNotEmpty("Issuer is required"),
      issueDate: isNotEmpty("Issue date is required"),
      certificateId: isNotEmpty("Certificate ID is required"),
    },
  });

  // Format date fields before update
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

  const handleSave = async () => {
    const values = form.values;

    if (
      !values.name ||
      !values.issuer ||
      !values.issueDate ||
      !values.certificateId
    ) {
      successNotification("Error", "All fields are required");
      return;
    }
    console.log(values.issueDate);
    // Format date fields before update
    const formattedIssueDate = formatDate(values.issueDate);

    // Build new certification object
    const newCert = {
      name: values.name,
      issuer: values.issuer,
      issueDate: formattedIssueDate,
      certificateId: values.certificateId,
    };

    let certs = Array.isArray(profile.certifications)
      ? [...profile.certifications]
      : [];
    certs.push(newCert);

    let updatedProfile = { ...profile, certifications: certs };

    try {
      await updateProfile(updatedProfile); // Save to backend
      const freshProfile = await getProfile(profile.id); // Refetch
      dispatch(setProfile(freshProfile));
      successNotification("Success", "Certification added successfully");
      props.setEdit(false);
    } catch (error) {
      successNotification("Error", "Failed to add certification");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">Add Certificate</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <TextInput
          {...form.getInputProps("name")}
          withAsterisk
          label="Title"
          placeholder="Enter title"
        />
        <SelectInput form={form} name="issuer" {...select[1]} />
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          value={form.values.issueDate}
          onChange={(value) => form.setFieldValue("issueDate", value)}
          withAsterisk
          maxDate={new Date()}
          label="Issue Date"
          placeholder="Pick date"
          valueFormat="MMM YYYY" // 💡 Shows Aug 2023 instead of full ISO
        />

        <TextInput
          {...form.getInputProps("certificateId")}
          withAsterisk
          label="Certificate Id"
          placeholder="Enter ID"
        />
      </div>
      <div className="flex gap-5">
        <Button onClick={handleSave} color="green.8" variant="light">
          Save
        </Button>
        <Button
          onClick={() => props.setEdit(false)}
          color="red.8"
          variant="light"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
export default CertiInput;
