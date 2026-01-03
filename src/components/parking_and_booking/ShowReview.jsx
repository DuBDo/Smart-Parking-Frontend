import Rating from "@mui/material/Rating";
import { formatDateForReview } from "../../utils/dateFormator";

const ShowReview = ({ name, rating, ratedDate, comment }) => {
  return (
    <div className="mt-2 mb-4">
      <div className="mb-1 flex gap-2 items-center">
        <h3 className="font-medium">{name}</h3>
        <span className="block text-sm text-[#999999]">
          {formatDateForReview(ratedDate)}
        </span>
      </div>
      <Rating
        name="half-rating-read"
        defaultValue={rating}
        size="small"
        readOnly
      />
      <p className="mb-2">{comment}</p>
    </div>
  );
};

export default ShowReview;
