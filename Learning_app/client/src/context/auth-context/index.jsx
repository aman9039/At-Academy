import { checkAuthService, loginService, registerService } from "@/services";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });

  async function handleRegisterUser(event) {
    event.preventDefault();

    try {
      const data = await registerService(signUpFormData);
    } catch (error) {
      // Handle the error
      if (error.response) {
        console.error("Error Response:", error.response.data);
        alert(
          `Error: ${error.response.data.message || "Something went wrong"}`
        );
      } else if (error.request) {
        console.error("No Response:", error.request);
        alert("No response from server. Please try again.");
      } else {
        console.error("Error Message:", error.message);
        alert("An unexpected error occurred.");
      }
    }
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    const data = await loginService(signInFormData);
    console.log(data,"dadaaaaaa");

    if(data.success){
      sessionStorage.setItem(
        "accessToken",JSON.stringify(data.data.acceessToken)
      );
      setAuth({
        authenticate : true,
        user : data.data.user,
      });
    }else {
      setAuth({
        authenticate : false,
        user : null,
      });
    }
    
  }

  // check auth user

  async function checkAuthUser() {
    const data = await checkAuthService();
    if (data.success) {
      setAuth({
        authenticate: true,
        user: data.data.user,
      });
    } else {
      setAuth({
        authenticate: false,
        user: null,
      });
    }
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  console.log(auth);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
