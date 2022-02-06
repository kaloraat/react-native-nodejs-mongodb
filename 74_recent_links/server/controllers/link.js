const Link = require("../models/link");

exports.postLink = async (req, res) => {
  try {
    const link = await new Link({ ...req.body, postedBy: req.user._id }).save();
    // console.log("saved link => ", link);
    res.json(link);
  } catch (err) {
    console.log(err);
  }
};

exports.links = async (req, res) => {
  try {
    const all = await Link.find().sort({ createdAt: -1 }).limit(500);
    res.json(all);
  } catch (err) {
    console.log(err);
  }
};
