//Connect to mongodb database(locally)
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const loanRoutes = require("./routes/loans");
const adminRoutes = require("./routes/admin");

const app = express();
dotenv.config();
app.use(express.json());



app.get("/", (req, res) => {
  res.send("api running");
});

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("mongo Connected Successfully");

    app.listen(process.env.PORT || 5000, (err) => {
      if (err) console.log(err);
      console.log(`running at port ${process.env.PORT}`);
    });

  })
  .catch((error) => console.log("Failed to connect", error));

  // Routes
app.use("/api/auth", authRoutes);
app.use("/api/loans", loanRoutes);

app.use("/admin", adminRoutes);