const express = require("express");

const router = express.Router();

// controllers
const {
  postLink,
  links,
  viewCount,
  like,
  unlike,
  linkDelete,
  linksCount,
} = require("../controllers/link");
const { requireSignin } = require("../controllers/auth");

router.post("/post-link", requireSignin, postLink);
router.get("/links/:page", links);
router.get("/links-count", linksCount);
router.put("/view-count/:linkId", viewCount);
router.put("/like", requireSignin, like);
router.put("/unlike", requireSignin, unlike);
router.delete("/link-delete/:linkId", requireSignin, linkDelete);

module.exports = router;
