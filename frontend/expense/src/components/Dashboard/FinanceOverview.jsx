import React from 'react';


const COLOURS = ["bg-blue-500", "bg-green-500", "bg-red-500"];

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {

    const balanceData = [

        {name: "Total Balance", amount: totalBalance},
        {name: "Total Income", amount: totalIncome},
        {name: "Total Expense", amount: totalExpense},


    ]

    return (

        <div className = "card">

            <div className = "">

                <h5 className = "">Overview</h5>

            </div>

            <CustomPieChart
                data = {balanceData}
                label = "Total Balance"
                totalAmount = {`$${totalBalance}`}
                colors = {COLOURS}
                showTextAnchor

            />

        </div>


    )


    


}

export default FinanceOverview;