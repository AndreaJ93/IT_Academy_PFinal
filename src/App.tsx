import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./redux/hooks";
import {
  fetchDataFromFirestore,
  setAuthenticated,
  setUser,
  setUserEmail,
  setUserId,
} from "./redux/userSlice";
import MyRoutes from "./routes/MyRoutes";
import { useEffect } from "react";
import { DocumentData } from "firebase/firestore";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storedUserDataJSON = localStorage.getItem("userData");

  useEffect(() => {
    if (storedUserDataJSON) {
      const storedUserData = JSON.parse(storedUserDataJSON);

      if (storedUserData !== null && storedUserData !== undefined) {
        dispatch(setUser(storedUserData.userName));
        dispatch(setUserId(storedUserData.userId));
        dispatch(setUserEmail(storedUserData.userEmail));
        dispatch<DocumentData>(fetchDataFromFirestore(storedUserData.userId));
        dispatch(setAuthenticated(true));
        navigate("/home");
      } else {
        navigate("/");
      }
    }
  }, []);
  // Convertir la cadena JSON de nuevo a objeto JavaScript

  return (
    <>
      <MyRoutes></MyRoutes>
    </>
  );
}

export default App;
