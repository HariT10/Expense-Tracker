//const User = require('../models/User');

const writeXLSX = require('xlsx');

const Expense = require('../models/Expense');

//add expense soruce 
exports.addExpense = async (req, res) => {

    const userId = req.user.id;

    try{

        const {icon, category , amount, date} = req.body;

        //validation to check for missing fields
        if(!category || !amount || !date){

            return res.status(400).json({ message: 'Please provide all required fields'});


        }

        const newExpense = new Expense({

            userId,
            icon,
            category,
            amount,
            date: new Date(date)


        });

        await newExpense.save();

        res.status(200).json(newExpense);

    } catch(error){

        res.status(500).json({ message: 'Server error. Please try again later.'});
    }




}


//getAllExpense

exports.getAllExpense = async (req, res) => {


    const userId = req.user.id;

    try{

        const expense = await Expense.find({ userId}).sort({ date: -1});
        res.json(expense);
    } catch (error) {

        res.status(500).json({ message: 'Server error. Please try again later.'});
    }




}


//deleteExpense

exports.deleteExpense = async (req, res) => {

    //const userId = req.user.id;


    try{

        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: 'Income deleted successfully'});
    } catch (error) {

        res.status(500).json({ message: 'Server error. Please try again later.'});

    }


}


//downloadExpenseExcel

exports.downloadExpenseExcel = async (req, res) => {

    const userId = req.user.id;

    try{
        const expense = await Expense.find({ userId}).sort({ date: -1});


        //prepare data for excel
        const excelData = expense.map((item) => ({

            Category: item.category,
            Amount: item.amount,
            Date: item.date

        }));

        const wb = writeXLSX.utils.book_new();
        const ws = writeXLSX.utils.json_to_sheet(excelData);
        writeXLSX.utils.book_append_sheet(wb, ws, 'Expense');
        writeXLSX.writeFile(wb, 'expense.xlsx');
        res.download('expense.xlsx');


    } catch (error){

        res.status(500).json({ message: 'Server error. Please try again later.'});
    }







}