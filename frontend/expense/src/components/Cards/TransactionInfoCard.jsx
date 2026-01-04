import React from 'react'

import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from 'react-icons/lu';

const TransactionInfoCard = ({title, icon, date, amount, type, hideDeleteButton}) => {


    const getAmountColor = () => {

        if(type == "income") {

            return "text-green-600 bg-green-100";
        } 
        
        else {
            return "text-red-600 bg-red-100";
        }

    }


    return (
        <div className = "group relative flex items-center gap-4 mt-2 p-3 rounded-lg" >

            <div className = "w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-xl text-gray-600 group-hover:bg-gray-200">

                {icon ? (

                    <img src = {icon} alt = {titel} className = "" />

                ) : (

                    <LuUtensils />


                )}


            </div>

            <div className = "flex-1 flex items-center justify-between">

                <div>
                    <p className = "text sm text-gray-900 font-medium">{title}</p>
                    <p className = "text-sm text-gray-500 mt-1">{date}</p>
                </div>

                <div className = "">

                    {!hideDeleteButton && (

                        <button className = ""

                            onClick = {onDelete} >
                            <LuTrash2 size = {18} />

                        </button>
                    )}

                    <div className = {`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountColor()}`} >

                        <h6 className = "">

                            {type == "income" ? "+" : "-"} ${amount}

                        </h6>

                        {type == "income" ? <LuTrendingUp /> : <LuTrendingDown />}

                    </div>

                </div>


            </div>


        </div>

    )
}

export default TransactionInfoCard;