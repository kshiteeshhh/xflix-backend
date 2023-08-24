const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

let server;
// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port
const {FlixPort}=config;
const {url}=config.mongoose;
mongoose.connect(url).then(() => {
    console.log("CONNECTED TO DATABASE :D");
  });
  // const userRoutes=require("./routes/v1/user.route");
  // app.use("/v1/users",userRoutes);
  app.listen(FlixPort, () => {
    console.log(`Express server started to listen on ${FlixPort}`);
  });
