import { Indicator, Menu, Notification } from "@mantine/core";
import { IconBell, IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getNotification, readNotification } from "../Services/NotiService";

const NotiMenu = () => {
    const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [opened, setOpened] = useState(false);
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    getNotification(user.id)
      .then((res) => {
        //console.log(res);
        setNotification(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);
  const unread = (index) => {
    let notis = [...notification];
    notis = notis.filter((noti, i) => i != index);
    setNotification(notis);
    readNotification(notification[index].id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <Menu shadow="md" width={400} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <Indicator disabled={notification.length<=0} processing color="red" offset={6} size={8}>
            <IconBell stroke={1.5} />
          </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>
        <div className="flex flex-col gap-1">
          {notification.map((noti, index) => (
            <Notification
            
            key={index}
            onClick={()=>{
                navigate(noti.route);
                unread(index);
                setOpened(false);
            }}
              onClose={() => unread(index)}
              className="hover:bg-mine-shaft-900 cursor-pointer"
              icon={<IconCheck size={20} />}
              color="teal"
              title={noti.action}
              mt="md"
            >
              {noti.message}
            </Notification>
          ))}
          {notification.length == 0 && (
            <div className="text-center text-mine-shaft-300">
              No Notifications
            </div>
          )}
        </div>

        <Menu.Divider />
      </Menu.Dropdown>
    </Menu>
  );
};
export default NotiMenu;
