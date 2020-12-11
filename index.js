// express를 express에 import
const express = require('express');
// app에 express를 담아 실행하게끔 한다.
const app = express();

const PORT = 4000;


function handleListening(){
    console.log(`Listening on : http://localhost:${PORT}`)
}


app.listen(PORT, handleListening);