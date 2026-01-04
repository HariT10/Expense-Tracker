//const User = require('../models/User');

const writeXLSX = require('xlsx');

const Income = require('../models/Income');

//add income soruce 
exports.addIncome = async (req, res) => {

    const userId = req.user.id;

    try{

        const {icon, source, amount, date} = req.body;

        //validation to check for missing fields
        if(!source || !amount || !date){

            return res.status(400).json({ message: 'Please provide all required fields'});


        }

        const newIncome = new Income({

            userId,
            icon,
            source,
            amount,
            date: new Date(date)


        });

        await newIncome.save();

        res.status(200).json(newIncome);

    } catch(error){

        res.status(500).json({ message: 'Server error. Please try again later.'});
    }




}


//getAllIncome

exports.getAllIncome = async (req, res) => {


    const userId = req.user.id;

    try{

        const income = await Income.find({ userId}).sort({ date: -1});
        res.json(income);
    } catch (error) {

        res.status(500).json({ message: 'Server error. Please try again later.'});
    }




}


//deleteIncome

exports.deleteIncome = async (req, res) => {

    //const userId = req.user.id;


    try{

        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: 'Income deleted successfully'});
    } catch (error) {

        res.status(500).json({ message: 'Server error. Please try again later.'});

    }


}


//downloadIncomeExcel

exports.downloadIncomeExcel = async (req, res) => {

    const userId = req.user.id;

    try{
        const income = await Income.find({ userId}).sort({ date: -1});


        //prepare data for excel
        const excelData = income.map((item) => ({

            Source: item.source,
            Amount: item.amount,
            Date: item.date

        }));

        const wb = writeXLSX.utils.book_new();
        const ws = writeXLSX.utils.json_to_sheet(excelData);
        writeXLSX.utils.book_append_sheet(wb, ws, 'Income');
        writeXLSX.writeFile(wb, 'income.xlsx');
        res.download('income.xlsx');


    } catch (error){

        res.status(500).json({ message: 'Server error. Please try again later.'});
    }







}