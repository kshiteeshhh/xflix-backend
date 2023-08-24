const {Video}=require("../models")
const ApiError=require("../utils/ApiError");
const _ = require("lodash"); 
const httpStatus = require("http-status");
const { contentRating } = require("../validations/custom.validation");
class VideoService{
    getVideos=async(req)=>{
        const query=req.query;
        const allVideos=await Video.find();
        if(_.isEqual(query,{}))
        return allVideos;
        if(query.sortBy)
        {
            if(query.sortBy=="viewCount")
            {
                const videos=allVideos;
                videos.sort((a,b) => b.viewCount - a.viewCount);
                return videos;
            }
            const videos=allVideos;
            videos.sort(function(a,b){
                return new Date(b.releaseDate) - new Date(a.releaseDate);
              });
              return videos;
        }
        const reqGenres=query.genres===undefined?"":query.genres.split(",");
        const reqTitle=query.title===undefined?undefined:query.title;
        const reqRating=query.contentRating===undefined?undefined:query.contentRating.split("+");
        if(reqGenres.includes("All"))return allVideos;
        else if(reqTitle && reqGenres && reqRating)
        {
            console.log("first");
            let rating=Number(reqRating[0]);
            const videos=await Video.find({$and:[{genre:{$in:reqGenres}},{title: { $regex: `\\b${reqTitle}\\b`, $options: "i" }}]});
            console.log("videos",videos);
            const finalV=videos.filter((ele)=>{
                if(ele.contentRating=="Anyone")return ele
                let value=ele.contentRating.split("+");
                if(rating===Number(value[0]))return ele;
             })
            return finalV;
        }
        else if(reqGenres && reqTitle)
        {
            const videos=await Video.find({$and:[{genre:{$in:reqGenres}},{title: { $regex: `\\b${reqTitle}\\b`, $options: "i" }}]});
            return videos;
        }
        else if(reqGenres)
        {
            const videos=await Video.find({genre:{$in:reqGenres}})
            return videos;
        }
        else if(reqTitle)
        {
            const videos=await Video.find({title: { $regex: `\\b${reqTitle}\\b`}})
            return videos;
        }
        else if(reqRating)
        {
            let rating=Number(reqRating[0]);
            const filteredarray=allVideos.filter((ele)=>{
               if(ele.contentRating=="Anyone")return ele
               let value=ele.contentRating.split("+");
               if(rating===Number(value[0]))return ele;
            })
            return filteredarray;
        }
    }
    createNewVideo=async(video)=>{
        const newVideo=await Video.create(video);
        return newVideo;
    }
    getVideoById=async(id)=>{
        console.log("id in getvide",id);
        const video=await Video.findById(id);
        console.log("video in service",video);
        return video;
    }
    updateVotes=async(video,change,vote)=>{
        if(change=="increase")
        {
            if(vote=="upVote"){video.votes.upVotes+=1;}
            else {video.votes.downVotes+=1}
        }
        else
        {
            if(vote=="upVote"){video.votes.upVotes-=1;}
            else {video.votes.downVotes-=1}
        }
        await video.save();
    }
    updateViews=async(video)=>{
        video.viewCount+=1;
        await video.save();
    }
}
module.exports=VideoService;