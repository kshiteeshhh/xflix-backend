const express=require("express");
const router=express.Router();
const videosRoute=require("./videos.route");
console.log("entered routes index.js")
router.use("/videos",videosRoute);
module.exports=router;