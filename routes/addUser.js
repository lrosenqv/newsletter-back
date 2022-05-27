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

  let usernameQuery = {
    username: req.body.username
  }

  users.findOne(usernameQuery, function(err, user){
    if(err) throw new Error(err)
    if(!user){
      users.insertOne(newUser)
      res.send("New User Added")
    } else {
      res.send("username already exist")
    }
  })

})

export default router;