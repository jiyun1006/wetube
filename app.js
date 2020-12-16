// express를 express에 import
// const express = require('express');
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import {userRouter} from "./router";


// app에 express를 담아 실행하게끔 한다.
const app = express();

const handleHome = (req, res) => res.send("hello from home")


// // arrow function
const handleProfile = (req, res) => res.send("You are on my profile")

// middleware 함수
// const betweenHome = (req, res, next) => {
//     console.log("i'm between");
//     next();

// }

// app.use(betweenHome);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(helmet());
app.use(morgan("dev"));

const middleware = (req, res, next) => {
    res.send("not happening");
}



// 경로가 '/' 인 라우터 
app.get("/", handleHome);

// 경로가 '/profile' 인 라우터
app.get("/profile", handleProfile)


app.use("/user", userRouter);

// 다른 파일에서 app.js를 이용할 수 있게 하는 코드
export default app;