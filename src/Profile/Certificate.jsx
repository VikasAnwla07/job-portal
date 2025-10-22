import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import CertiCard from "./CertiCard";
import CertiInput from "./CertiInput";
import { useSelector } from "react-redux";

const Certificate = () => {
  const [edit, setEdit] = useState(false);
  const [addCerti, setAddCerti] = useState(false);
  const profile = useSelector((state) => state.profile);
  const handleEdit = () => {
    setEdit(!edit);
  };
  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-5 flex justify-between">
        Certifications{" "}
        <div className="flex gap-2">
          <ActionIcon
            onClick={() => setAddCerti(true)}
            variant="subtle"
            size="lg"
            color="brightSun.4"
          >
            <IconPlus className="w-4/5 h-4/5" />
          </ActionIcon>
          <ActionIcon
            onClick={handleEdit}
            variant="subtle"
            size="lg"
            color={edit ? "red.8" : "brightSun.4"}
          >
            {edit ? (
              <IconX className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {profile?.certifications?.map((certi, index) => (
          <CertiCard key={index} edit={edit} {...certi} index={index} />
        ))}

        {addCerti && <CertiInput setEdit={setAddCerti} />}
      </div>
    </div>
  );
};
export default Certificate;
