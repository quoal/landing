const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/quoal");
const entrySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

const Entry = mongoose.model("Entry", entrySchema);

app.use(express.static(path.resolve(__dirname, "./assets")));

app.route("/sign-up").post(async (req, res) => {
    const { email } = req.body;
    console.log(req.body);
    const entry = await Entry.create({ email }).catch((error) => {
        console.error(error);
        res.status(400).json({
            code: 400,
            error: {
                code: 400,
                msg: "User already signed up",
            },
        });
    });
    res.json(entry);
});

app.listen(3000, () => {
    console.log("running server");
});
