const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const CircularJSON = require('circular-json');
const dataModel = require('../schemas/dataSchema');

mongoose.connect('mongodb://127.0.0.1:27017/tyresdb?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2');

router.post('/', async (req, res) => {
    console.log("request received");
    const { registrationNo:regno, mobileNo:mobno } = req.body;
    console.log(regno,mobno)
    try {
        const userData = await dataModel.findOne({ registrationNo:regno, mobileNo:mobno });
        console.log(userData)
        if (userData) {
            // Stringify only if userData is not null
            // const jsonString = CircularJSON.stringify(userData.occurances);
            res.json(userData.occurances);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500); // Internal Server Error
    }
});

module.exports = router;
