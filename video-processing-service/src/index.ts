import exp from "constants";
import express from "express";
import ffmpeg from "fluent-ffmpeg";
import { json } from "stream/consumers";

const app = express();
app.use(express.json());

app.post("/process-video", (req,res) => {
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    if(!inputFilePath || !outputFilePath){
        res.status(400).send("Bad Request: Missing file path.");
    }

    ffmpeg(inputFilePath)
    .outputOption("-vf", "scale=-1:360") //360p
    .on("end", () =>{

        res.status(200).send("Video Processing Complete successfully");

    })
    .on("error", (err) =>{
        console.log(`An error has occured: ${err.message}`);
        res.status(500).send(`Internal Server error: ${err.message}`);
    })
    .save(outputFilePath);
});

const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`Video processing service is running at http:localhost:${port}`);
});
