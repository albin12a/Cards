import { useDispatch, useSelector } from "react-redux";
import { addCard, getCardLists } from "../../store/slices/cardSlice";
import CardBox from "./cardBox";
import { useState } from "react";
import Modal from "./modal";
import NoResult from "./noresult";
import CreateEdit from "./createEdit";

const CardView = () => {
  const cardList = useSelector(getCardLists);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const onSave = (
    title: string,
    desc: string,
    img: string,
    genre: string,
    duration: number | string,
    imgName: string,
    id: string
  ) => {
    let data = [...cardList];
    data.unshift({
      title,
      description: desc,
      image: img,
      genre,
      duration,
      imageName: imgName,
      id,
    });
    dispatch(
      addCard({
        data,
      })
    );
    setOpen(false);
  };
  return (
    <>
      <div className="card-wrapper">
        <button className="create-btn bttn" onClick={() => setOpen(!open)}>
          Create
        </button>
        {!!cardList?.length && <h3 className="title">Cards</h3>}
        <div className="card-view-wrapper">
          {cardList?.length ? (
            [...cardList?.map((val, i) => <CardBox key={i} data={val} />)]
          ) : (
            <NoResult />
          )}
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <CreateEdit onClose={() => setOpen(false)} onSave={onSave} />
      </Modal>
    </>
  );
};

export default CardView;
