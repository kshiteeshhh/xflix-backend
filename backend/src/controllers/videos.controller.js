const httpStatus = require("http-status");
const {Video}=require("../models")
const VideoService = require("../services/videos.service");
const ApiError=require("../utils/ApiError");
const catchAsync=require("../utils/catchAsync")
const VideoServiceInstance = new VideoService();
const getVideos=catchAsync(async(req,res)=>{
    const videos=await VideoServiceInstance.getVideos(req);
    if(!videos)
    {throw new ApiError(httpStatus.NOT_FOUND,"No videos found");}
    return res.status(200).send({videos: videos});
});

const createNewVideo=catchAsync(async(req,res)=>{
    console.log("entered create in controller")
    const video=await VideoServiceInstance.createNewVideo(req.body);
    if(!video){
        throw new ApiError(httpStatus.BAD_REQUEST,"could not post video");
    }
    return res.status(201).send(video);
})

const getVideoById=catchAsync(async(req,res)=>{
    console.log("controller");
    const id=req.params.videoId;
    console.log(id);
    const video=await VideoServiceInstance.getVideoById(id);
    if(!video)
    {throw new ApiError(httpStatus.NOT_FOUND,"No video found with matching id");}
    return res.status(200).send(video);
})
const updateVotes=catchAsync(async(req,res)=>{
    const id=req.params.videoId;
    console.log("id",id);
    const change=req.body.change;
    const vote=req.body.vote
    const video=await VideoServiceInstance.getVideoById(id);
    if(!video)
    {throw new ApiError(httpStatus.NOT_FOUND,"No video found with matching id");}
    await VideoServiceInstance.updateVotes(video,change,vote);
    return res.sendStatus(httpStatus.NO_CONTENT);
})
const updateViews=catchAsync(async(req,res)=>{
    const id=req.params.videoId;
    const video=await VideoServiceInstance.getVideoById(id);
    if(!video)
    {throw new ApiError(httpStatus.NOT_FOUND,"No video found with matching id");}
    await VideoServiceInstance.updateViews(video);
    return res.sendStatus(httpStatus.NO_CONTENT);
})
module.exports={
    getVideos,createNewVideo,getVideoById,updateVotes,updateViews
}
