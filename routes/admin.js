import express from "express";
import CryptoJS from "crypto-js";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { getUsers } from "./users.js";
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  let printUsers = `<h1>Users</h1><ul>`
  let users = getUsers('users.json')

  users.forEach(user => {
    printUsers += `<li id=${user.userId}>
      ${user.firstname}
      Subscription: ${user.subscription ? "Yes" : "No"}
    </li>
    <button>Delete</button>`
  })
  res.send(printUsers += `</ul>`)
});


function getPass(url) {
  let content = {}

  if(existsSync(url)){
    content = JSON.parse(readFileSync(url))
  }
  return content
}

router.post("/", (req, res) => {
  let adminPass = getPass('adminPass.json');

  let decryptedPass = CryptoJS.AES.decrypt(adminPass.password, "Salt key pass").toString(CryptoJS.enc.Utf8)

  if(req.body.password === decryptedPass){
    res.redirect('/admin')
  } else {
    res.send("Fel")
  }
})

export default router;
