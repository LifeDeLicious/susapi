import bodyParser from "body-parser";
import express from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
//import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";

dotenv.config();

const app = express();

const port = 3000;

//not needed if frontend is hosted it seems like!
// app.use((req, res, next) => {
//   // res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // allowing localhost frontned to request
//   // res.header("Access-Control-Allow-Methods", "GET, POST");
//   // res.header("Access-Control-Allow-Headers", "Content-Type");
//   // next();
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));

app.listen(port, () => {
  console.log("listening on port 3000");
});

//login page
app.get("/", (req, res) => {
  console.log("req, received");
});

app.post("/testpost", (req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] POST request received`);
  const { telemetryData } = req.body;

  console.log(telemetryData[0].TrackPosition);

  const data = req.body;
  //console.log(req);
  const jsonString = JSON.stringify(req.body);
  const sizeInBytes = Buffer.byteLength(jsonString, "utf-8");
  const sizeInKB = sizeInBytes / 1024;
  const sizeInMB = sizeInKB / 1024;

  //console.log(`request: ${JSON.stringify(data)}`);
  console.log(`size in bytes: ${sizeInBytes}`);
  console.log(`size in KB: ${sizeInKB}`);
  console.log(`size in MB: ${sizeInMB}`);
  //const

  // const params = {
  //   Bucket: "sstr-laps",
  //   Key: "testjson5.json",
  //   Body: Buffer.from(JSON.stringify(telemetryData), "utf-8"),
  //   Metadata: {
  //     "x-amz-meta-my-key": "your value",
  //     userid: "1",
  //     car: "mercedes_amg_gt3",
  //     track: "bikernieki - oval",
  //   },
  // };

  //uploadObject(params);

  // if (telemetryData && telemetryData.length > 0) {
  //   console.log("First TrackPosition:", telemetryData[0].TrackPosition);
  // } else {
  //   console.log("No telemetry data received");
  // }

  // const telArr = JSON.parse(req.body.telemetryData);
  // console.log(`Track pos: ${telArr[0].TrackPosition}`);

  // fs.writeFile(filepath, jsonString, (err) => {
  //   if (err) {
  //     console.log("error saving json");
  //   }
  // });

  res.json({ sessionID: 12345 }).status(200);
});

const uploadObject = async (params) => {
  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log(
      "successfully uploaded object: " + params.Bucket + "/" + params.Key
    );
    return data;
  } catch (err) {
    console.log("error : ", err);
  }
};

app.get("/session", (req, res) => {
  res.status(200).json({ userID: "amongus" });
  // ieraksts db jauns sessions, masina, trase, users ...
  // responsaa sessiona id

  //no clienta pectam visi apli suutaas ar userid un session id, vajadzetu but ok thinkingemoji
});
