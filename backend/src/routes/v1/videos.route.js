const express=require("express");
const validate=require("../../middlewares/validate")
const validations=require("../../validations/video.validation")
const router=express.Router();
const {getVideos,getVideoById,createNewVideo,updateVotes,updateViews}=require("../../controllers/videos.controller");
const createVideoMiddleware=validate(validations.createVideoValidation);
const videoIdMiddleware=validate(validations.videoIdValidation);
const votesMiddleware=validate(validations.votesValidation)
const getVideosMiddleware=validate(validations.getVideosValidation)
router.get("/",getVideosMiddleware,getVideos);
router.post("/",createVideoMiddleware,createNewVideo);
router.get("/:videoId",videoIdMiddleware,getVideoById);
router.patch("/:videoId/votes",votesMiddleware,videoIdMiddleware,updateVotes);
router.patch("/:videoId/views",videoIdMiddleware,updateViews);

module.exports=router;