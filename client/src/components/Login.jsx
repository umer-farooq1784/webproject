import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { app } from "../config/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { validateUser } from "../api";
import { LoginVideo } from "../assets/video";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true });
    }
  }, []);

  const handleLoginWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(firebaseAuth, googleProvider);
      if (userCredential) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        firebaseAuth.onAuthStateChanged((userCredential) => {
          if (userCredential) {
            userCredential.getIdToken().then((token) => {
              validateUser(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data,
                });
              });
            });
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
            navigate("/login");
          }
        });
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  return (
    <div className='relative w-screen h-screen'>
      <video
        src={LoginVideo}
        type="video/mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      ></video>
      <div className='absolute inset-0 bg-darkOverlay flex items-center justify-center p-4'>
        <div className='w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center'>
          <div className='flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all' onClick={handleLoginWithGoogle}>
            <FcGoogle className='text-xl'/>
            Sign in With Google
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
