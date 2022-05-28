import express from "express";
import CryptoJS from "crypto-js";
import { existsSync, readFileSync, writeFileSync } from "fs";
const router = express.Router();

let htmlHead ='<link rel="stylesheet" href="/css/style.css"><script src="js/script.js" defer></script>'

/* GET users listing. */
router.get("/", function (req, res, next) {
  let printUsers = `<h1>Users</h1><ul>`

  req.app.locals.db.collection('users').find().toArray()
  .then(results => {
    for (let i = 0; i < results.length; i++) {
      printUsers += `
      <li id=${results[i]._id}> ${results[i].firstname}
        Subscription: ${results[i].subscription}
        <div class="custom-checkbox">
        <input class="status" type="checkbox" name="status" ${results[i].subscription ? "checked" : ""} />
        <label for="status">
          <div class="status-switch" data-unchecked="Off" data-checked="On"></div>
        </label>
        </div>
      </li>
      `
    }

    printUsers += `</ul>`

    res.send(htmlHead + printUsers)
  })
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
