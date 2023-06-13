import { useState } from "react";
import { cardDetails } from "../../types/card";
import Modal from "./modal";
import { useDispatch } from "react-redux";
import { deleteCard, updateCard } from "../../store/slices/cardSlice";
import { timeConvert } from "../../helperFunctions";
import CreateEdit from "./createEdit";
import Details from "./details";

interface CardBoxProps {
  data: cardDetails;
}

const CardBox = ({ data }: CardBoxProps) => {
  const [open, setOpen] = useState(false);
  const [openDetailsModal, setDetailsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [selectedData, setSelectedData] = useState<cardDetails | null>();
  const wordBreak = (word: string) => {
    return word?.length > 100 ? `${word.substring(0, 100)}...` : word;
  };
  const onSave = (
    title: string,
    desc: string,
    img: string,
    genre: string,
    duration: number | string,
    imageName: string,
    id: string
  ) => {
    let data = {
      title,
      description: desc,
      image: img,
      genre,
      duration,
      imageName,
      id,
    };
    dispatch(
      updateCard({
        data,
      })
    );
    setOpen(false);
  };
  const onEdit = (e:any) => {
    e.stopPropagation()
    setSelectedData(data);
    setOpen(true);
  };
  const unSelect = () => {
    setSelectedData(null);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onDetailsHandler = (e:any) => {
    e.stopPropagation();
    setSelectedData(data);
    setDetailsModalOpen(true);
  };
  const onDetailsModalClose = () => {
    setDetailsModalOpen(false);
  };
  return (
    <>
      <div className="card-box" onClick={onDetailsHandler}>
        <div
          className="img-wrapper"
          style={{ backgroundImage: `url(${data.image})` }}
        ></div>
        <div className="hover-class">
          <div className="action-btn">
            <button className="edit bttn" onClick={onEdit}>
              <i className="fa fa-edit"></i>
            </button>
            <button
              className="delete bttn"
              onClick={(e:any) =>{e.stopPropagation(); dispatch(deleteCard({ id: data.id }))}}
            >
              <i className="fa fa-trash-o"></i>
            </button>
          </div>
          <h4>{data.title}</h4>
          <div className="small-wrap">
            <h5>{timeConvert(data.duration)}</h5>
            <h5>{data.genre}</h5>
          </div>
          <p>{wordBreak(data.description)}</p>
        </div>
      </div>
      <Modal open={open} onClose={onClose}>
        <CreateEdit
          data={selectedData}
          unselect={unSelect}
          onClose={onClose}
          onSave={onSave}
        />
      </Modal>
      <Modal open={openDetailsModal} onClose={onDetailsModalClose}>
        <Details data={selectedData} />
      </Modal>
    </>
  );
};

export default CardBox;
