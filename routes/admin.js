import express from "express";
import { getUsers } from "./users.js";
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  let printUsers = `<h1>Users</h1><ul>`

  let users = getUsers('users.json')

  //JSON.parse(users)

  users.forEach(user => {
    printUsers += `<li id=${user.userId}>${user.firstname}</li><button>Delete</button>`
  })
  res.send(printUsers += `</ul>`)
});

export default router;
