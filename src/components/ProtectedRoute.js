import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  //const navigate = useNavigate();
  const {user} = UserAuth();
  if (user && !user.uid) {
    //navigate('/login')
    return <Navigate to='/login' />;
  } else if (user === null) {
    return <></>
  } else{
    return children;
  } 
  //return children;
}

export default ProtectedRoute;