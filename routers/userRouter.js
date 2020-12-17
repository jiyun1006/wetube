import express from "express";
import routes from "../routes";

const userRouter = express.Router();


userRouter.get(routes.users, (req,res) => res.send("USERS"));
userRouter.get(routes.userDetail, (req,res) => res.send("USERDETAIL"));
userRouter.get(routes.editProfile, (req,res) => res.send("EDITPROFILE"));
userRouter.get(routes.changePassword, (req,res) => res.send("CAHNGEPASSWORD"));


export default userRouter;

