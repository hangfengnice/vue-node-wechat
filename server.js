const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const users = require("./routes/users");
const profiles = require("./routes/profiles");
const chat = require('./routes/chat')

const passport = require("passport");

mongoose
  .connect("mongodb://localhost:27017/vue-node-wechat", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("ok");
  });

const port = 5000;
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));

// passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);

app.use(users);
app.use("/profile", profiles);
app.use("/chat", chat);


// app.get('/',(req,res) => {
//   res.send('hello hangfeng')
// })

app.listen(port, () => {
  console.log(`serve is running on port ${port}`);
});
