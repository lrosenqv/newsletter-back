import express from "express";
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  req.app.locals.db.collection('users').find().toArray()
  .then(results => {
    res.json(results)
  })
});

router.get('/:username', (req, res) => {
  let userQuery = { _id: req.body._id }

  req.app.locals.db.collection('users').findOne(userQuery, function(err, user) {
    if(err) throw new Error(err);
    if(!user){
      res.send("hoppsan")
    } else {
      res.send("Hej" + user.username)
    }
  })
})

export default router;
