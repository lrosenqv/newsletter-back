import express from "express";
import { existsSync, readFileSync, writeFileSync } from "fs";
import CryptoJS from "crypto-js";
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  let users = getUsers('users.json')
  res.json(users)
  //res.json({ message: "I wish we had some information to give you ☹️" });
});

export function getUsers(url) {
  let content = [];
  if(existsSync(url)){
    content = JSON.parse(readFileSync(url))
  }
  return content
}

router.post('/', (req, res) => {
  const users = getUsers('users.json')

  let foundUser = users.find((user) => {
    let decryptedPass = CryptoJS.AES.decrypt(user.password, "Salt key").toString(CryptoJS.enc.Utf8)
    return user.username == req.body.username && decryptedPass == req.body.password
  })

  if(foundUser){
    foundUser.isLoggedin = true;
    writeFileSync("users.json", JSON.stringify(users))
    res.send("You are now logged in.")
  }
  res.send("Fel uppgifter")
})


export default router;
