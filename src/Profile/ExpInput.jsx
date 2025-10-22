import { Button, Checkbox, Textarea } from "@mantine/core";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { useEffect, useState } from "react";
import { MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { setProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { updateProfile, getProfile } from "../Services/ProfileService";

const ExpInput = (props) => {
  const select = fields;
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  useEffect(() => {
    if (!props.add)
      form.setValues({
        title: props.title,
        company: props.company,
        location: props.location,
        description: props.description,
        startDate: new Date(props.startDate),
        endDate: new Date(props.endDate),
        working: props.working,
      });
  }, []);

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      title: "",
      company: "",
      location: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      working: false,
    },
    validate: {
      title: isNotEmpty("Title is required"),
      company: isNotEmpty("Company is required"),
      location: isNotEmpty("Location is required"),
      description: isNotEmpty("Description is required"),
    },
  });

  const handleSave = async () => {
    form.validate();
    if (!form.isValid()) return;
    let exp = [...profile.experiences];
    const values = form.getValues();

    // Format dates to "YYYY-MM-DDT00:00:00"
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

    values.startDate = formatDate(values.startDate);
    values.endDate = formatDate(values.endDate);

    if (props.add) {
      exp.push(values);
    } else {
      exp[props.index] = values;
    }

    let updatedProfile = { ...profile, experiences: exp };
    props.setEdit(false);
    try {
      await updateProfile(updatedProfile); // Save to backend
      const freshProfile = await getProfile(profile.id); // Refetch
      dispatch(setProfile(freshProfile));
      successNotification(
        "Success",
        `Experience ${props.add ? "Added" : "Updated"} Successfully`
      );
    } catch (error) {
      successNotification("Error", "Failed to update Experience");
    }
  };

  const [desc, setDesc] = useState(
    "As a Software Engineer at Google, I am responsible for designing, developing, and maintaining scalable software solutions that enhance user experience and improve operational efficiency. My role involves collaborating with cross-functional teams to define project requirements, develop technical specifications, and implement robust applications using cutting-edge technologies. I actively participate in code reviews, ensuring adherence to best practices and coding standards, and contribute to the continuous improvement of the development process."
  );
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">
        {props.add ? "Add" : "Edit"} Experience
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput form={form} name="title" {...select[0]} />
        <SelectInput form={form} name="company" {...select[1]} />
      </div>
      <SelectInput form={form} name="location" {...select[2]} />
      <Textarea
        {...form.getInputProps("description")}
        withAsterisk
        label="Summary"
        autosize
        minRows={3}
        placeholder="Enter Summary..."
      />

      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          {...form.getInputProps("startDate")}
          withAsterisk
          maxDate={form.getValues().endDate || undefined}
          label="Start Date"
          placeholder="Pick date"
        />

        <MonthPickerInput
          {...form.getInputProps("endDate")}
          withAsterisk
          minDate={form.getValues().startDate || undefined}
          maxDate={new Date()}
          label="End Date"
          placeholder="Pick date"
          disabled={form.getValues().working}
        />
      </div>
      <Checkbox
        {...form.getInputProps("working")}
        autoContrast
        label="Currently working year"
      />
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
export default ExpInput;
