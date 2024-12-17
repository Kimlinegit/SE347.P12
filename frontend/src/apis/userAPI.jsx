

import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI() { 
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState (null);
    const [users, setUsers] = useState ([]);
    const [userUpdate, setUserUpdate] = useState(false);
    const [image, setImage] = useState({});
    const token = localStorage.getItem("token");
 

    useEffect(() => {
      const checkLoggedIn = async () => {
        const token = localStorage.getItem('token');
        try {
          if(token){
            await getUserProfile(token);
            if(isLogged && isAdmin) {
              await getAllUser(token);
            }           
          }
        } catch (err) {
          console.log(err.response);
        }
      }
      checkLoggedIn();
    }, [userUpdate, isLogged, token]);


    const uploadImage = async (formData) => {
      try {
        const res = await axios.post("/api/image/upload", formData);
        console.log(res.data);
  
        const { public_id, url } = res.data;
        setImage({ public_id, url });
  
      } catch (error) {
        alert(error.response.data.msg)
      }
    }


    const logInUser =  async (userData) => {
      try {
        const res = await axios.post("/api/user/login", userData);
        const token = res.data.accesstoken;
        localStorage.setItem("token", token);
        setUserUpdate(!userUpdate);
        await getUserProfile(token);
        setIsLogged(true); 
      } catch (err) {
        alert(err.response.data.message); 
      }
    }

    const getUserProfile = async (token) =>{
      try {
          const res = await axios.get('/api/user/profile', {
              headers: {Authorization: token}
          })
          setIsLogged(true)
          const user = res.data;
          if(user){
            setUser(user);
            user.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          } else {
            setUser(null);
          }
      } catch (err) {
          console.log(err.response.data.message)
      }
    }

    const registerUser = async (userData) => {
      try {
        console.log(userData);
        const res = await axios.post("/api/user/register", userData);
        const token = res.data;
        localStorage.setItem("token", token);
        console.log(token);
      } catch (err) {
        alert(err.response.data.message);
      }
    }

    const changePassWord = async (passData) => {
      if(token){
        try {
          const res = await axios.put("/api/user/changePass", passData, {
            headers: {Authorization: token}
          })
          console.log(res);
          setUserUpdate(!userUpdate);
        } catch (err) {
          console.log(err.message);
        }
      }
    }


    const updateUser = async (userData) => {
      if(token){
        try {
          const res = await axios.put("/api/user/update_profile", userData, {
            headers: {Authorization: token}
          })
          alert(res.data.message);
          setUserUpdate(!userUpdate);
        } catch (err) {
          alert(err.response.data.message);
        }
      }
    }


    const logOutUser = async () => {
      localStorage.removeItem("firstLogin");
      setIsLogged(false);
      setUser(null);
    }



    const getAllUser = async (token) => {
      try {
        const res = await axios.get("/api/user/getAll", {
          headers: {Authorization: token}
        })
        setUsers(res.data.users);
        setUserUpdate(!userUpdate);
      } catch (err) {
        console.log(err.message);
      }
    }


    const updateRole = async (userId, newRole) => {
      try {
        const res = await axios.put(`/api/user/${userId}`, newRole, {
          headers: {Authorization: token}
        });
        alert(res.data.message);
        setUserUpdate(!userUpdate);
      } catch (error) {
        console.log(error.message);
      }
    }


    const deleteUser = async (userId) => {
      try {
        const res = await axios.delete(`/api/user/${userId}`, {
          headers: {Authorization: token}
        });
        alert(res.data.message);
        setUserUpdate(!userUpdate);
      } catch (error) {
        console.log(error.message);
      }
    }


    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        user: [user, setUser],
        users: [users, setUsers],
        image: [image, setImage],
        registerUser: registerUser,
        updateUser: updateUser,
        changePassWord: changePassWord,
        logOutUser: logOutUser,
        getAllUser: getAllUser,
        logInUser: logInUser,
        uploadImage: uploadImage,
        updateRole: updateRole,
        deleteUser: deleteUser
    }
}

export default UserAPI


