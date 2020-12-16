// express를 express에 import
// const express = require('express');
import express from "express";


// app에 express를 담아 실행하게끔 한다.
const app = express();

const PORT = 4000;
 

function handleListening(){
    console.log(`Listening on : http://localhost:${PORT}`)
}


const handleHome = (req, res) => res.send("hello from home")


// arrow function
const handleProfile = (req, res) => res.send("You are on my profile")

// 경로가 '/' 인 라우터 
app.get("/", handleHome);

// 경로가 '/profile' 인 라우터
app.get("/profile", handleProfile)

// 포트명과 리스닝이 성공했을 때 실행될 콜백 함수
app.listen(PORT, handleListening);