const express = require("express");
const app = express();
const cors = require("cors");
const login=require("./routes/login");
const tracing=require("./routes/tracing");
const _404=require("./routes/404");
const appError=require("./middleware/error")

port= process.env.port||3001;


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


app.use(cors());

app.use(login);
app.use(tracing);
app.use(_404);
app.use(appError);


app.listen(3001, () => {
  console.log("running on port 3001");
});
