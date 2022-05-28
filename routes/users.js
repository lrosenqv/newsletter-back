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
  req.app.locals.db.collection('users').findOne(ObjectId(req.params._id))
  .then(result => {
    res.json(result)
  })
})

export default router;
