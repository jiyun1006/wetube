import "./db";
import app from "./app";
import dotenv from 'dotenv';
dotenv.config()
import Video from './models/Video';
import Video from './models/Comment';

const PORT = process.env.PORT;

const handleListening = () =>console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);