import express from "express";
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  req.app.locals.db.collection('users').find().toArray()
  .then(results => {
    res.json(results)
  })
});

export default router;
