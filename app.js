// express를 express에 import
// const express = require('express');
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import videoRouter from "./routers/videoRouter"
import userRouter from "./routers/userRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes"


// app에 express를 담아 실행하게끔 한다.
const app = express();


app.set('view engine', "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(helmet());
app.use(morgan("dev"));


app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);





// 다른 파일에서 app.js를 이용할 수 있게 하는 코드
export default app;