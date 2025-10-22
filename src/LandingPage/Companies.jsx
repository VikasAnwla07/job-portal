import { companies } from "../Data/Data";
import Marquee from "react-fast-marquee";

const Companies = ()=>{
    return(
        <div className="mt-20 pb-5">
            <div className="text-4xl text-center mb-5 font-semibold text-mine-shaft-100">Trusted By <span className="text-bright-sun-400">1000+</span> Companies</div>
            <Marquee>
                {
                    companies.map((company,index)=><div key={index} className="mx-5 px-2 py-1 hover:bg-mine-shaft-900 rounded-xl cursor-pointer">
                             <img className="h-16" src={`/Companies/${company}.png`} alt={company} />
                    </div>)
                }
            </Marquee>
            

        </div>
    )
    

}
export default Companies;