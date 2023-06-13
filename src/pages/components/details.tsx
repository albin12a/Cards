import { cardDetails } from "../../types/card";
import { timeConvert } from "../../helperFunctions";

interface CardBoxProps {
  data: cardDetails | null | undefined;
}

const Details = ({ data }: CardBoxProps) => {
  return (
    <div className="card-details">
      <h4>{data?.title}</h4>
      <div>
        <div
          className="details-img-wrapper"
          style={{ backgroundImage: `url(${data?.image})` }}
        ></div>
        <div className="hover-class">
          <div className="small-wrap">
            <h5>{timeConvert(data?.duration)}</h5>
            <h5>{data?.genre}</h5>
          </div>
          <p>{data?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
