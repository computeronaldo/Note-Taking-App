import { useParams, Navigate, Outlet, useOutletContext } from "react-router-dom";
import { NoteData } from "./NoteList";

type NoteLayoutPropsType = {
  notesData: NoteData[];
};
const NoteLayout = ({ notesData }: NoteLayoutPropsType) => {
  const { id } = useParams();
  const note = notesData.find((note) => note.id === id);

  if (note === undefined) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet context={note} />;
};

export default NoteLayout;

export const useNote = () => {
    return useOutletContext<NoteData>();
}