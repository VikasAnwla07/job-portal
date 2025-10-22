import { use } from "react";
import { Link, useParams } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";

const PostedJobCard = (props) => {
  const { id } = useParams();
//   const isId = String(props.id)===id;
//   console.log(id);
//   console.log(props.id);
  return (
    <Link
      to={`/posted-job/${props.id}`}
      className={` rounded-xl p-2 border-l-2 hover:bg-opacity-80 border-l-bright-sun-400 ${props.id == id
          ? "bg-bright-sun-400 text-black"
          : "bg-mine-shaft-900 text-mine-shaft-300"
      }`}
    >
      <div className="font-semibold">{props.jobTitle}</div>
      <div className="text-xs font-medium">{props.location}</div>
      <div className="text-xs ">{props.jobStatus=="DRAFT"?"Drafted ":props.jobStatus=='CLOSED'?"Closed ":"Posted "}{timeAgo(props.postTime)}</div>
    </Link>
  );
};
export default PostedJobCard;
