import express from "express";
const router = express.Router();

/* GET users listing. */
router.get("/admin", function (req, res, next) {
  res.json({ message: "Admin-site" });
});

export default router;
