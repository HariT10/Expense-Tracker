import React, { useEffect, useState } from 'react';


import DashboardLayout from "../../components/layouts/DashboardLayout";

import useUserAuth from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';

import { API_PATHS } from '../../utils/apiPath';

import axiosInstance from '../../utils/axiosInstance';

import InfoCards from '../../components/Cards/InfoCards';

import {LuHand, LuHandCoins, LuWalletMinimal} from "react-icons/lu";

import {IoMdCard} from "react-icons/io";

import {addThousandsSeparator} from '../../utils/helper';

import RecentTransactions from '../../components/Dashboard/RecentTransactions';


const Home = () => {

    useUserAuth();

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);

    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {

        if (loading) return;

        setLoading(true);

        try{

            const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);

            if(response.data) {

                setDashboardData(response.data);    
            }

        } catch (error) {

            console.log("Error fetching dashboard data:", error);

        } finally {

            setLoading(false);

        }


    }

    useEffect(() => {

     
        fetchDashboardData();

    }, []);




  return (
    <DashboardLayout activeMenu="Dashboard">

        <div className = "my-5 mx-auto"> 


            <div className = "grid grid-cols-1 md:grid-cols-3 gap-6">

                <InfoCards

                    icon = {<IoMdCard />}
                    label = "Total Balance"
                    value = {addThousandsSeparator(dashboardData?.totalBalance || 0)}
                    color = "bg-primary"

                ></InfoCards>

                <InfoCards

                    icon = {<LuWalletMinimal />}
                    label = "Total Income"
                    value = {addThousandsSeparator(dashboardData?.totalIncome || 0)}
                    color = "bg-green-500"

                ></InfoCards>


                <InfoCards

                    icon = {<LuHandCoins />}
                    label = "Total Expense"
                    value = {addThousandsSeparator(dashboardData?.totalExpense || 0)}
                    color = "bg-blue-500"

                ></InfoCards>



            </div>



            <div className = "grid grid-cols-1 md:grid-cols-2 gap6 mt-6">

                <RecentTransactions

                    transactions = {dashboardData?.recentTransactions}
                    onSeeMore = {() => navigate("/expense")}
                
                />

                <FinanceOverview 

                    totalBalance = {dashboardData?.totalBalance || 0}
                    totalIncome = {dashboardData?.totalIncome || 0}
                    totalExpense = {dashboardData?.totalExpense || 0}
                
                />



            </div>







        </div>

            
      
    </DashboardLayout>
  );
};

export default Home;
