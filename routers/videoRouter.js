import express from "express";
import routes from "../routes";

const videoRouter = express.Router();


videoRouter.get(routes.videos, (req,res) => res.send("VIDEOS"));
videoRouter.get(routes.upload, (req,res) => res.send("UPLOAD"));
videoRouter.get(routes.videoDetail, (req,res) => res.send("VIDEODETAIL"));
videoRouter.get(routes.editVideo, (req,res) => res.send("EDITVIDEO"));
videoRouter.get(routes.deleteVideo, (req,res) => res.send("DELETEVIDEO"));


export default videoRouter;