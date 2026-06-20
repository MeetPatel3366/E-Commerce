import { CiStar } from "react-icons/ci"
import { FaStar } from "react-icons/fa"

interface PropTypes{
    rating:number
}

const StarRating = ({rating}:PropTypes) => {
  return (
    <div className="flex items-center gap-2">
        {[1,2,3,4,5].map((star)=>{
            return(
                star<=rating?(
                <span key={star}>
                    <FaStar />
                </span>

                ):(
                    <span key={star}>
                    <CiStar />
                </span>
                )
            )
        })}
    </div>
  )
}

export default StarRating