import { useRef, useState, useEffect } from "react";
import InputField from "./inputField";
import { cardDetails } from "../../types/card";
import { GENREOPTIONS } from "../../constants/constants";

interface ModalProps {
  onClose: () => void;
  onSave: (
    arg0: string,
    arg1: string,
    arg2: string,
    arg3: string,
    arg4: number | string,
    arg5: string,
    arg6: string
  ) => void;
  data?: cardDetails | null;
  unselect?: () => void;
}
const CreateEdit = ({ onClose, onSave, data, unselect }: ModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [imageName, setImageName] = useState("");
  const [imgErr, setImgErr] = useState("");
  const [duration, setDuration] = useState<number | string | "">("");
  const [img, setImg] = useState<any | null>("");
  const [cardId, setCardId] = useState("");
  const imgRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setGenre(data.genre);
      setDuration(data.duration);
      setCardId(data.id);
      setImg(data.image);
      setImageName(data.imageName);
    }
  }, [data]);

  const errFn = () => {
    return !title || !description || !genre || !duration || !img;
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let id = cardId
      ? cardId
      : Date.now().toString(36) + Math.random().toString(36).slice(2);
    onSave(title, description, img, genre, duration, imageName, id);
    reset();
  };

  const reset = () => {
    setTitle("");
    setDescription("");
    setGenre("");
    setDuration("");
    setImg("");
    setImageName("");
    setCardId("");
    if (imgRef.current != null) {
      imgRef.current.value = "";
    }
    setImgErr("");
    unselect && unselect();
    onClose();
  };

  const getBase64 = (file: File) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImg(reader.result);
    };
    reader.onerror = function (error) {};
  };
  const imageUpload = (e: any) => {
    e.preventDefault();
    if (
      e.target.files[0]?.name.includes(".png") ||
      e.target.files[0]?.name.includes(".jpg")
    ) {
      setImageName(e.target.files[0]?.name);
      getBase64(e.target.files[0]);
      setImgErr("");
    } else setImgErr("Image format should be png or jpg");
  };

  useEffect(() => {
    if (imageName && imgErr) {
      setTimeout(() => {
        setImgErr("");
      }, 1000);
    }
  }, [imgErr, imageName]);

  return (
    <>
      <h4>{data ? "Update" : "Create"} Card</h4>
      <form onSubmit={onSubmit}>
        <InputField
          type="text"
          name=""
          labelText={"Title"}
          required={true}
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          maxLength={60}
          placeholder="Title"
        />
        <InputField
          name=""
          textarea={true}
          labelText={"Description"}
          required={true}
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          maxLength={300}
          placeholder="Description"
        />
        <InputField
          type="number"
          name=""
          labelText={"Duration"}
          required={true}
          value={duration ?? null}
          onChange={(e) => setDuration(e.currentTarget.value)}
          maxLength={5}
          placeholder="Duration in minutes"
        />
        <InputField
          type="select"
          name=""
          labelText={"Genre"}
          required={true}
          value={genre}
          onChange={(e) => setGenre(e.currentTarget.value)}
          placeholder="Select Genre"
          options={GENREOPTIONS}
        />

        <InputField
          type="file"
          name=""
          labelText={"Image"}
          value={img ? img : null}
          required={true}
          inputref={imgRef}
          imageName={imageName}
          onChange={imageUpload}
          placeholder="Upload png or jpg image"
          error={imgErr}
        />
        <button disabled={errFn()} type="submit" className="submit bttn">
          {data ? "Update" : "Submit"}
        </button>
      </form>
    </>
  );
};

export default CreateEdit;
