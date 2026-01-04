//import React, { createContext, useState } from 'react';

import React, { createContext, useState, useEffect } from 'react';


export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);


    // 🔹 Restore user on refresh
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    //function to update user data
    const updateUser = (userData) => {

        setUser(userData);

        localStorage.setItem("user", JSON.stringify(userData)); // persist

    };


    //function to clear user data (e.g on a logout)
    const clearUser = () => {

        setUser(null);
        localStorage.removeItem("user");
    };

    return (


        <UserContext.Provider
            value = {{

                user,
                updateUser,
                clearUser,

            }}
        >

            {children}
        </UserContext.Provider>



    );


}



export default UserProvider;