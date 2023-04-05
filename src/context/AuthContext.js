import { createContext, useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider)
  }

  const logOut = () => {
    return signOut(auth);
  }
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      }else{
        setUser({})
      }
    }) 
    return unsubscribe();
  }, [])

  return (
    <UserContext.Provider value={{ createUser, signIn, signInWithGoogle, logOut, user}}>
      { children }
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext);
};
