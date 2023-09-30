const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    //미들웨어 확장
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      //res.setHeader('Cookie',)
      return res.json(user);
    });
  })(req, res, next);
});
router.post("/", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
      gender: req.body.gender,
      blog: req.body.blog,
    });

    // res.setHeader("Access-Control-Allow-Origin", "*")
    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
