import express from "express";
import CryptoJS from "crypto-js";

const router = express.Router();

router.get("/", function (req, res, next) {
  res.json({ message: "I wish we had some information to give you ☹️" });
});

router.post('/', (req, res) => {
  let users = req.app.locals.db.collection('users');

  let cryptoPass = CryptoJS.AES.encrypt(req.body.password, "Salt key").toString();
  let subOption = req.body.subscription;

  if(subOption === "true"){
    subOption = true
  } else {
    subOption = false
  }

  let newUser = {
    firstname: req.body.firstname,
    username: req.body.username,
    password: cryptoPass,
    email: req.body.email,
    subscription: subOption
  }

  users.insertOne(newUser)
  res.send("New User Added")
})

export default router;