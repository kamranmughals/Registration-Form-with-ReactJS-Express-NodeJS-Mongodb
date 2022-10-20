const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const jsonErrorHandler = (err, req, res, next) => {
  res.status(500).send({ error: err });
};
const app = express();
// The other middleware
app.use(bodyParser.json());
// Your handler
app.use(jsonErrorHandler);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Origin",
    "Origin, x-Requested-With, Content-type, Accept"
  );
  res.header("Access-Control-Allow-Origin", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

// require("dotenv").config();
mongoose.connect(process.env.DATABASE_ACCESS, () => console.log(`Database is Connected to ${port}.....`));

// const dbConnect = async () => {
//   mongoose
//     .connect(process.env.DB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log("Connected to database......");
//     })
//     .catch((err) => {
//       console.log("unable to coonect");
//       console.log(err);
//     });
// };
// dbConnect();

// mongoose
//   .connect("mongodb://127.0.0.1:27017/Register", {
//     useNewUrlParser: true,
//   })
//   .then(() => {
//     console.log("DB successfully Connected.....");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// getmodel
const userRegister = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
});

const Register = mongoose.model("registers", userRegister);

//modeldata

app.get("/users", async (req, res) => {
  try {
    const resp = await Register.find();

    res.status(200).send(resp);
  } catch (err) {
    res.status(404).json({
      message: " not found",
    });
  }
});

app.post("/register", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;

  const data = new Register({
    firstname,
    lastname,
    email,
    password,
    confirmpassword,
  });
  data
    .save()
    .then((db) => {
      res.json(db);
    })
    .catch((err) => {
      res.json(err);
    });

  // .then((result) => {
  //   res.status(201).json({
  //     message: "user registered successfully",
  //     result,
  //   });
  // })
  // .catch((err) => {
  //   res.status(404).json({
  //     message: "Unable to create user",
  //     err,
  //   });
  // });
  console.log(data);
});

// app.post("/register", (req, res) => {
//     const firstname = req.body.firstname;

//     res.json({
//         firstname
//     })
// lastname = req.body.lastname,
// email = req.body.email,
// password = req.body.password,
// confirmpassword = req.body;

//   const data = new Register({
//     firstname: firstname
//     // lastname,
//     // email,
//     // password,
//     // confirmpassword
//   });
// //   data
// //     .save()
// //     .then((result) => {
// //       res.status(201).json({
// //         message: "user registered successfully",
// //         result,
// //       });
// //     })
//   console.log(data);
// });

//server
app.listen(port, () => {
  console.log(`Server started running on ${port}`);
});

const res = Register.find({}, (err, user) => {
  if (err) console.log(err);
  user.toString();
});

// module.exports = mongoose;
