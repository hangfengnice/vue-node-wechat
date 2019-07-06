// @login & register
const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const passport = require("passport");

router.get("/test", (req, res) => {
  res.json({
    msg: "profile is works"
  });
});
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    if (req.body.img) profileFields.img = req.body.img;
    if (req.body.name) profileFields.name = req.body.name;
    if (req.body.text) profileFields.text = req.body.text;
    // 多张图片
    if (req.body.imgs) {
      profileFields.imgs = req.body.imgs.split("|");
    }

    // 存储数据
    new Profile(profileFields).save().then(profile => {
      res.json(profile);
    });
  }
);

// 下来刷新接口
router.get(
  "/latest",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find()
      .sort({ date: -1 })
      .then(profiles => {
        if (!profiles) {
          res.status(404).json("没有任何消息");
        } else {
          let newProfiles = [];
          for (let i = 0; i < 3; i++) {
            if (profiles[i] != null) {
              newProfiles.push(profiles[i]);
            }
          }
          res.json(newProfiles);
        }
      });
  }
);

// 上拉加载

// 上拉加载 3 条

router.get(
  "/:page/:size",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find()
      .sort({ date: -1 })
      .then(profiles => {
        if (!profiles) {
          res.status(404).json("没有任何信息");
        } else {
          let size = req.params.size;
          let page = req.params.page;
          let index = size * (page - 1);
          let newProfiles = [];
          for (let i = index; i < size * page; i++) {
            if (profiles[i] != null) {
              newProfiles.unshift(profiles[i]);
            }
          }
          res.json(newProfiles);
        }
      });
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find()
      .then(profile => {
        if (!profile) {
          return res.status(404).json("没有内容");
        } else {
          res.json(profile);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// 获取单个信息
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ _id: req.params.id })
      .then(profile => {
        if (!profile) {
          return res.status(404).json("没有内容");
        } else {
          res.json(profile);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);
router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;
    Profile.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: profileFields },
      { new: true }
    ).then(profile => {
      res.json(profile);
    });
  }
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ _id: req.params.id })
      .then(profile => {
        // profile.save().then(profile => res.json(profile))
        res.json(profile);
      })
      .catch(err => res.status(404).json("删除失败"));
  }
);

module.exports = router;
