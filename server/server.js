const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const bodyParser = require("body-parser");
const cors = require('cors');
const PORT = process.env.PORT || 5000;


const app = express();
app.use(cors());
const urlencodedParser = bodyParser.urlencoded({ extended: true })

app.use(express.json())

app.use('/auth', urlencodedParser, authRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://server:server@cluster0.vzkyk.mongodb.net/serverTest?retryWrites=true&w=majority`)
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}


start()