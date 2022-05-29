import express from "express";
import CryptoJS from "crypto-js";
import { existsSync, readFileSync, writeFileSync } from "fs";
import axios from "axios";

let isLoggedIn = false;
const router = express.Router();

let htmlHead ='<link rel="stylesheet" href="/css/style.css"><script src="/js/script.js" defer></script>'

router.get("/", function(req, res){
  res.send(htmlHead + `
    <p>Enter password</p>
    <form method="post" action="/admin">
      <input type="password" name="password" placeholder="Password"/>
      <button type="submit">Login</button>
    </form>
  `)
})

router.post("/", (req, res) => {
  let admin = {};
  if(existsSync('adminPass.json')){
    admin = JSON.parse(readFileSync('adminPass.json'))
  }

  let decryptedPass = CryptoJS.AES.decrypt(admin.password, "Salt key pass").toString(CryptoJS.enc.Utf8)

  if(req.body.password === decryptedPass){
    isLoggedIn = true
    res.redirect('/admin/ok')
  } else {
    res.send("Fel lösenord")
  }
})

router.get("/ok", function (req, res, next) {
  if(isLoggedIn){
    let printUsers = `
    <h1>Users</h1>
    <form method="GET" action="http://localhost:3001/admin/ok/subscribers">
      <button type="submit">Get subscribed emails</button>
    </form>
    <ul>
      <li>
        <p>Username</p><p>_id</p><p>Subscription</p>
      </li>
    `

    axios.get('http://localhost:3001/users')
    .then(results => {
      results.data.forEach((item) => {
        printUsers += `
        <li id=${item._id}>
          <p>${item.username}</p>
          <p>${item._id}</p>
          <div class="custom-checkbox">
          <input class="status" type="checkbox" name="status" ${item.subscription ? "checked" : ""} />
          <label for="status">
            <div class="status-switch" data-unchecked="Off" data-checked="On"></div>
          </label>
          </div>
        </li>
        `
      })
      printUsers += `</ul>`
      res.send(htmlHead + printUsers + `<a href="/admin">Logout</a>`)
    })
  } else {
    isLoggedIn = false;
    res.redirect("/admin")
  }
});

router.get('/ok/subscribers', (req, res) => {
  let printEmails = `
  <a href="/admin/ok">Go back</a>
  <div id="emailList"><p>`

  let query = { subscription: true }
  let options = {
    sort: { email: 1 },
    projection: { _id: 0, email: 1 }
  }

  req.app.locals.db.collection('users').find(query, options).toArray()
  .then(result => {
    result.forEach(item => {
      if(item.email != undefined || null)
      printEmails += `${item.email},`
    })
    res.send(htmlHead + printEmails + `</p></div>`)
  })
})


export default router;
