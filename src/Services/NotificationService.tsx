import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

const successNotification = (title: string, message: string) => {
    notifications.show({
        title: title,
        message: message,
        color: 'teal',
        withBorder: true,
        icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
        className: "!border-green-500",
    });
}

const errorNotification = (title: string, message: string) => {
    notifications.show({
        title: title,
        message: message,
        color: 'red',
        withBorder: true,
        icon: <IconX style={{ width: "90%", height: "90%" }} />,
        className: "!border-red-500",
    });
}
export { successNotification, errorNotification };