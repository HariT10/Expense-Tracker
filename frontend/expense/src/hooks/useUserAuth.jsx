import { useEffect } from "react";

import { useContext } from "react";

import { UserContext } from "../context/userContext";

import { useNavigate } from "react-router-dom";

import axiosInstance from "../utils/axiosInstance";

import { API_PATHS } from "../utils/apiPath";

export const useUserAuth = () => {

    const {user, updateUser, clearUser} = useContext(UserContext);
    const navigate = useNavigate(); 

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token && !user) {

            if (user) return;

            let isMounted = true;

            const fetchUserInfo = async () => {

                try{

                    const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER)

                    if (isMounted) {

                        updateUser(response.data);

                    }

                } catch (error) {

                    console.error("Failed to fetch user info:", error);
                    
                    if (isMounted) {

                        clearUser();
                        //localStorage.removeItem("token");
                        navigate("/login");

                    }


                }


            }

           
            fetchUserInfo();

            return () => {
                isMounted = false;
            }

        } 

    }, [updateUser, clearUser, navigate]);


}

export default useUserAuth;