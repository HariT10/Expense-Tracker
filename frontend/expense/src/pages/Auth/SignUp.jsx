import React, { useState } from 'react';

import AuthLayout from '../../components/layouts/AuthLayout';

import { useNavigate } from 'react-router-dom';

import Input from "../../components/Inputs/Input";

import { Link } from 'react-router-dom';

import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';

import { UserContext } from "../../context/userContext";
import { useContext } from 'react';

import uploadImage from "../../utils/uploadImage";

import axiosInstance from '../../utils/axiosInstance';

import { API_PATHS } from '../../utils/apiPath';

import { validateEmail } from '../../utils/helper';

const SignUp = () => {

    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const [error, setError] = useState(null);

    
    const {updateUser} = useContext(UserContext);

    const navigate = useNavigate();


    //Handle submit for sign up form
    const handleSubmit = async (e) => {


        e.preventDefault();

        let profileImageUrl = "";

        if (!fullName){

            setError("Please enter your full name");

            return;
        }

        if (!validateEmail(email)){

            setError("Please enter a valid email address");

            return;
        }

        if (!password){

            setError("Please enter your password");

            return;
        }

        //console.log("passed validation");


        setError("");


        //SignUp API Call

        try{


            //upload image
            if (profilePic){

                const imgUploadRes = await uploadImage(profilePic);

                profileImageUrl = imgUploadRes.imageUrl || "";


            }



            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {

                fullName,
                email,
                password,
                profileImageUrl
            });

            const { token, user } = response.data;

            if (token) {

                localStorage.setItem("token", token);

                updateUser(user);

                navigate("/dashboard");

            }

        } catch (error) {

            if (error.response && error.response.data.message){

                setError(error.response.data.message);

            } else {

                setError("An error occurred. Please try again.");

            }   


        }

    }

    



    return(

        <AuthLayout>

            <div className= "lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">

                <h3 className = "text-xl font-semibold text-black">Create an Account</h3>

                <p className = "text-xs text-slave-700 mt-[5px] mb-6">

                    Join Today!

                </p>


                <form onSubmit={handleSubmit}>


                    <ProfilePhotoSelector image = {profilePic} setImage={setProfilePic} />



                    <div className = "grid grid-cols-1 md:grip-cols-2 gap-4">

                        <Input

                            value = {fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            label = "Full Name"
                            placeholder="Enter your full name"
                            type = "text"

                        />

                        <Input

                            value = {email}

                            onChange={({target}) => setEmail(target.value)}

                            label="Email Address"

                            placeholder="harishan.thilak@gmail.com"

                            type="text"


                        />




                        <Input

                            value = {password}

                            onChange={({target}) => setPassword(target.value)}

                            label="Password"

                            placeholder="Testing"

                            type="password"

                        />


                    </div>

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
                    
                    
                    <button type = "submit" className="button-primary">
                    
                        SignUp
                    
                    </button>
                    
                    <p className="text-[13px] text-slate-800 mt-3">
                    
                        Already Have an Account?{" "}
                    
                    <Link className = "font-medium text-primary underline" to="/login">
                    
                        Login
                                            
                    </Link>
                    
                    
                                        </p>
                    
                    
                </form> 


            </div>



        </AuthLayout>


    )
}

export default SignUp;