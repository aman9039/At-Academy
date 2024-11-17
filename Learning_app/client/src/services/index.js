import axiosInstance from "@/api/axiosInstance";


export async function registerService(formData) {
   const {data}= await axiosInstance.post("/auth/register",{
    ...formData,
    role: "user"
   });
   console.log(formData);
   console.log(data);
   
   
   return data;
  }
