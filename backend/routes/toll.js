require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const router = express.Router()
const tf = require('@tensorflow/tfjs-node')
// router.use(express.json())
// const authenticateToken = require('./authmiddleware.js');
const authenticateToken = require('../authmiddleware')

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/tyresdb?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2')
const tollSchema = require('../schemas/tollSchema')
const dataModel = require('../schemas/dataSchema')




// configuring multer to store images in a temporary directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/laxmi/OneDrive/Desktop/TOHcomplete/backend/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'image-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });



modelPath = "C:/Users/laxmi/OneDrive/Desktop/TOHcomplete/backend/converted_model/model.json"
async function loadModel() {
    try {
        model = await tf.loadLayersModel(`file://${modelPath}`);
        console.log("Model loaded");
    } catch (error) {
        console.error("Error loading the model:", error);
    }
}
loadModel();




router.post('/register', async (req, res) => {
    const { username: usr, password: pwd, location: loc } = req.body
    const duplicate = await tollSchema.findOne({ username: usr })
    if (duplicate) {
        res.json({ 'exists': true });
        console.log("usr exists")
        return;
    }
    else {
        try {
            const salt = await bcrypt.genSalt(10)
            const hPassword = await bcrypt.hash(pwd, salt)
            await tollSchema.create({ 'username': usr, 'password': hPassword, 'location': loc })
            console.log("user saved")
            res.status(201).json({ message: 'User registered successfully' })
        }
        catch (e) {
            console.log(e)
        }
    }

})

router.post('/login', async (req, res) => {
    const { username: usr, password: pwd } = req.body;

    try {
        const user = await tollSchema.findOne({ username: usr });
        
        if (user && (await bcrypt.compare(pwd, user.password))) {
            const acsToken = jwt.sign({ username: usr}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
            res.json({ accessToken: acsToken });
        } else {
            res.json({ wrongCredentials: true });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/upload', authenticateToken, upload.single('image'), async (req, res) => {

    const { regno, telno } = req.body
    // console.log(req.file)
    const processedImage = await sharp(req.file.path)
        .resize({ width: 128, height: 128 })
        .toBuffer();
    try {
        const inputTensor = tf.node.decodeImage(processedImage);
        const expandedTensor = inputTensor.expandDims();
        const normalizedTensor = expandedTensor.div(255.0);
        const reshapedTensor = normalizedTensor.reshape([1, 128, 128, 3]);
        const predictions = model.predict(reshapedTensor);
        console.log(predictions.dataSync()[0])
        const label = predictions.dataSync()[0] >= 0.5 ? "good" : "bad"


        console.log("req.user.username",req.user.username)
        // const reportExists = await dataModel.findOne({ registrationN:registrationNo })
        if (predictions.dataSync()[0] < 0.5) {
            const occuredAt = await tollSchema.findOne({ username: req.user.username })
            console.log(occuredAt.location)
            const newOccurrence = {
                prediction: label,
                confidence: predictions.dataSync()[0],
                toc: new Date(),
                exit: occuredAt.location
            }
            const reportExists = await dataModel.findOne({ registrationNo: regno });

            console.log(reportExists)
            if (reportExists !== null && reportExists !== undefined) {
                await dataModel.updateOne({ registrationNo: regno }, { $push: { occurances: newOccurrence } });
            } else {
                const newDoc = new dataModel({
                    registrationNo: regno, // Use the actual registration number
                    mobileNo: telno,
                    occurances: [newOccurrence] // Initialize the array
                });
                await newDoc.save();
                console.log(newDoc)
            }
        }
        res.sendStatus(200)
        return
    }
    catch (e) {
        console.log(e.message)
        res.send(e.message)
    }

})


// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     // console.log(authHeader);

//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         console.log('Unauthorized')
//         return res.sendStatus(401); // Unauthorized if token is missing

//     }

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) {
//             console.log("Forbidden")
//             return res.sendStatus(403);
//         }


//         req.user = user;

//         // Continue with the next middleware or route handler
//         next();
//     });
// };

// module.exports = authenticateToken;



module.exports = router

