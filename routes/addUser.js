import express from "express";
import { nanoid } from "nanoid";
import { existsSync, readFileSync, writeFileSync } from "fs";
import CryptoJS from "crypto-js";
import { getUsers } from "./users.js"
const router = express.Router();

router.get("/", function (req, res, next) {
  res.json({ message: "I wish we had some information to give you ☹️" });
});

router.post('/', (req, res) => {
  let collectedUsers = getUsers("users.json");

  let cryptoPass = CryptoJS.AES.encrypt(req.body.password, "Salt key").toString();
  let sub = req.body.subscription;

  if(sub === "true"){
    sub = true
  } else {
    sub = false
  }

  let newUser = {
    firstname: req.body.firstname,
    username: req.body.username,
    password: cryptoPass,
    userId: nanoid(),
    isLoggedin: false,
    admin: false,
    subscription: sub
  }

  collectedUsers = [...collectedUsers, newUser]

  writeFileSync("users.json", JSON.stringify(collectedUsers))
  res.send("New User Added")
})

export default router;