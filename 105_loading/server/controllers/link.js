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
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;

    const all = await Link.find()
      .skip((page - 1) * perPage)
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 })
      .limit(perPage);
    res.json(all);
  } catch (err) {
    console.log(err);
  }
};

exports.viewCount = async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(
      req.params.linkId,
      { $inc: { views: 1 } },
      { new: true }
    );
    // console.log("LINK VIEW", link);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

exports.like = async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(
      req.body.linkId,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true }
    );
    res.json(link);
  } catch (err) {
    console.log(err);
  }
};

exports.unlike = async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(
      req.body.linkId,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    );
    res.json(link);
  } catch (err) {
    console.log(err);
  }
};

exports.linkDelete = async (req, res) => {
  try {
    const link = await Link.findById(req.params.linkId).select("postedBy");
    if (link.postedBy._id.toString() === req.user._id.toString()) {
      const deleted = await Link.findByIdAndRemove(req.params.linkId);
      res.json(deleted);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.linksCount = async (req, res) => {
  try {
    const count = await Link.countDocuments();
    // console.log("count", count);
    res.json(count);
  } catch (err) {
    console.log(err);
  }
};
