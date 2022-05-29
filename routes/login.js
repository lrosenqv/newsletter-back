import express from "express";
import CryptoJS from "crypto-js";

const router = express.Router();

router.post('/', (req, res) => {
  let query = { username: req.body.username }

  req.app.locals.db.collection('users').findOne(query, function(err, user){
    if(err) throw new Error(err);

    if(!user){
      res.send("Not found")
    } else {
      let decryptedPass = CryptoJS.AES.decrypt(user.password, "Salt key").toString(CryptoJS.enc.Utf8)

      if(req.body.password === decryptedPass){
        res.json(user)
      } else {
        res.send("Not Found");
      }
    }
  })
})

export default router;
