const express = require("express");

const router = express.Router();

// controllers
const {
  postLink,
  links,
  viewCount,
  like,
  unlike,
} = require("../controllers/link");
const { requireSignin } = require("../controllers/auth");

router.post("/post-link", requireSignin, postLink);
router.get("/links", links);
router.put("/view-count/:linkId", viewCount);
router.put("/like", requireSignin, like);
router.put("/unlike", requireSignin, unlike);

module.exports = router;
