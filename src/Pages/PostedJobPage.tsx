import PostedJob from "../Components/PostedJob/PostedJob";
import PostedJobDesc from "../Components/PostedJob/PostedJobDesc";

const PostedJobPage = () =>{
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['Poppins'] px-4">
            <div className="flex gap-5">
                <PostedJob />
                <PostedJobDesc />
            </div>
        </div>
    )
}
export default PostedJobPage;