const express = require("express");
const logger = require("morgan");
const cors = require("cors");


const DB_HOST ="mongodb+srv://Andy:notAllowedAccess@cluster0.5mjlhcp.mongodb.net/my-clients?retryWrites=true&w=majority"


mongoose.connect(DB_HOST)
.then(()=>console.log("connect done"))
.catch(err=>console.log(err.message))

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.listen(3001);

app.use("/api/contacts", contactsRouter);

app.use(async (req, res) => {
  const { method, url } = req;

  await console.log(method, url);
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;