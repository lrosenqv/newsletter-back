import express from "express";
import { ObjectId } from 'mongodb';

const router = express.Router();

//Get all users
router.get('/', function (req, res, next) {
  req.app.locals.db.collection('users').find().toArray()
  .then(results => {
    res.json(results)
  })
});


//Get one user based on objectId
router.get('/:_id', (req, res, next) => {
  let query = ObjectId(req.params._id)

  req.app.locals.db.collection('users').findOne(query)
  .then(result => {
    res.json(result)
  })
})

//Update user subscription
router.put('/update/:_id', (req, res, next) => {
  res.query = {"_id": ObjectId(req.params._id)};

  let updates = {
    "$set": {
    "subscription": req.body.subscription
    },
  };

    req.app.locals.db.collection('users').updateOne(res.query, updates)
    .then(result => {
      res.json(result)
    })
})

export default router;