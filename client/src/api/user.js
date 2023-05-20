
import axios from "axios";

const baseURL = "http://localhost:4000/";

export const getAllUsers = async () => {
    try {
      const res = await axios.get(`${baseURL}api/users/getUsers`);
      return res.data;
    } catch (error) {
      return null;
    }
  };

  export const changingUserRole = async (userId , role) => {
    try{
     const res = axios.put(`${baseURL}api/users/updateRole/${userId}` , {
       data: {role: role}
     });
     return res;
    
   } catch (error){
     return null
    }
 }
 
 export const removeUser = async (userId) => {
   try {
     const res = axios.delete(`${baseURL}api/users/delete/${userId}`);
     return res;
   } catch (error) {
     return null;
   }
 };
 
 
 