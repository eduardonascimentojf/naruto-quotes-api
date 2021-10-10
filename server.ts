import express, { Request, Response } from "express";
import cors from 'cors';
import neatCsv from "neat-csv";
import fs from "fs";
var csvObj: any;

const app = express();
app.use(cors()); 



fs.readFile("./finalQuotes.csv", async (err: any, data: any) => {
  if (err) {
    console.error(err);
    return;
  }
  csvObj = await neatCsv(data);
});

app.get("/", async (req, res) => {
  try{
    const max = csvObj.length;
    const random = Math.trunc(Math.random() * max);
    //console.log(csvObj[random]);
    return res.status(200).json({speaker: csvObj[random][0], quote: csvObj[random][1]})
  }
  catch (err){
    return res.status(500).json({err: err})
  }

});

//http://localhost:3000/
app.listen(5000, () => console.log("Server is running in port 5000"));
