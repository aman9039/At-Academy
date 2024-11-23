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
      // Call the service and wait for the response
      const data = await registerService(signUpFormData);
    } catch (error) {
      // Handle the error
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error Response:", error.response.data);
        alert(
          `Error: ${error.response.data.message || "Something went wrong"}`
        );
      } else if (error.request) {
        // Request was made, but no response received
        console.error("No Response:", error.request);
        alert("No response from server. Please try again.");
      } else {
        // Something else went wrong
        console.error("Error Message:", error.message);
        alert("An unexpected error occurred.");
      }
    }
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    const data = await loginService(signInFormData);

    if (data.success) {
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.accessToken)
      );
      setAuth({
        authenticate: true,
        user: data.user,
      });
    }
    else{
      setAuth({
        authenticate: false,
        user: null,
      });
    }
  }

  // check auth user

  async function  checkAuthUser() {
    const data = await checkAuthService();
    if(data.success){
      setAuth({
        authenticate : true,
        user : data.user,
      })
    }else{
      setAuth({
        authenticate : false,
        user : null,
      });
    }
  }

  useEffect(() => {
    checkAuthUser()
  },[]);

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
