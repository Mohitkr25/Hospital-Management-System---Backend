const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

require("../db/conn");
const Authenticate = require("../middlesware/authenticate");

const User = require("../model/userSchema");
// const { AddPatient } = require("./controller");

router.get("/", (req, res) => {
  res.send("hello from router");
});
// using promises
// router.post("/register",  (req, res) => {
//   const { name, email, phone, work, password, cnf_password } = req.body;
//   if (!name || !email || !phone || !password || !cnf_password) {
//     return res.status(422).json({ error: "All fiels are required" });
//   }
//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "Email already exist" });
//       }
//       const user = new User({
//         name,
//         email,
//         phone,
//         work,
//         password,
//         cnf_password,
//       });
//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "User registration sucessfully" });
//         })
//         .catch((err) =>
//           res.status(300).json({ error: "failed to registration" })
//         );
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// using  asyns await

router.post("/registerD", async (req, res) => {
  const { name, email, profession, mobile, address, password, cnf_password } =
    req.body;
  if (
    !name ||
    !email ||
    !mobile ||
    !profession ||
    !address ||
    !password ||
    !cnf_password
  ) {
    return res.status(422).json({ error: "All fiels are required" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    } else if (password != cnf_password) {
      return res.status(422).json({ error: "Password are not matching" });
    }
    const user = new User({
      name,
      email,
      profession,
      mobile,
      address,
      password,
      cnf_password,
    });

    await user.save();
    res.status(201).json({ message: "User Registration succesfully" });
  } catch (err) {
    console.log(err);
  }
});

// Login Route
router.post("/loginD", async (req, res) => {
  // console.log(req.body);
  // res.json({ message: "Login" });
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: "Wrong credential" });
        return;
      }
      res.json({ message: "User Signin succesful" });
    } else {
      res.status(400).json({ error: "Wrong credential" });
      return;
    }
  } catch (err) {
    console.log(err);
  }
});

//Routes for about us page

router.get("/About", Authenticate, (req, res) => {
  // console.log("In about router");
  res.send(req.rootUser);
});

// Logout route
router.get("/LogoutD", (req, res) => {
  console.log("Logout page");
  res.clearCookie("jwtoken", {
    path: "/",
  });

  res.status(200).send("user Logout");
});

module.exports = router;
