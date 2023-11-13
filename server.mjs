
import express from 'express';
import cors from 'cors';
import path from 'path';
const __dirname = path.resolve();
import 'dotenv/config';
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken';
import { createServer } from "http";
import { Server as socketIo } from 'socket.io';
import cookie from 'cookie'
import { client } from './mongodb.mjs'
import { globalIoObject, socketUsers } from './core.mjs'

const db = client.db("mongocrud");
const col = db.collection("products");


import chatrouter from './routes/chat.mjs'
import authRouter from './routes/auth.mjs'
import postRouter from './routes/product.mjs'



const app = express();
app.use(express.json()); // body parser
app.use(cookieParser()); // cookie parser
app.use(cors({
  origin: [ 'http://localhost:3001'], 
  credentials: true, 
}));

// /api/v1/login
app.use("/api/v1", authRouter)

app.use("/api/v1", (req, res, next) => { // JWT
    console.log("cookies: ", req.cookies);

    const token = req.cookies.token;
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log("decoded: ", decoded);

        req.body.decoded = {
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            isAdmin: decoded.isAdmin,
            _id: decoded._id,
        };
        req.currentUser = {
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            isAdmin: decoded.isAdmin,
            _id: decoded._id,
        };

        console.log(decoded)
        next();

    } catch (err) {

        // TODO: match all unauth routes
        
        res.status(401).send({ message: "invalid token" })
    }


})

app.use("/api/v1", postRouter) // Secure api
app.use("/api/v1/", chatrouter)
app.use("/api/v1/ping", (req, res) => {
    res.send("OK");
})
app.use(express.static(path.join(__dirname, 'web/build')))
app.get(express.static(path.join(__dirname, 'web/build')))
app.use("*", express.static(path.join(__dirname, 'web/build')))
// THIS IS THE ACTUAL SERVER WHICH IS RUNNING
const server = createServer(app);

// handing over server access to socket.io
const io = new socketIo(server, {
    cors: {
        origin: ["*", "http://localhost:3000"],
        methods: "*",
        credentials: true
    }
});

globalIoObject.io = io;

io.use((socket, next) => {
    console.log("socket middleware");
    // Access cookies, including secure cookies

    const parsedCookies = cookie.parse(socket.request.headers.cookie || "");
    console.log("parsedCookies: ", parsedCookies.token);

    try {
        const decoded = jwt.verify(parsedCookies.token, process.env.SECRET);
        console.log("decoded: ", decoded);

        socketUsers[decoded._id] = socket;

        socket.on("disconnect", (reason, desc) => {
            console.log("disconnect event: ", reason, desc); // "ping timeout"
        });

        next();
    } catch (err) {
        return next(new Error('Authentication error'));
    }
});

io.on("connection", (socket) => {
    console.log("New client connected with id: ", socket.id);

    socket.on("NEW_MESSAGE", (data) => {
        console.log("Received a new message:", data);
    });

    socket.on("disconnect", (reason, desc) => {
        console.log("disconnect event: ", reason, desc);
    });
});




const PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
    console.log("server is running on", PORT);
})