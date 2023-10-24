
import express from 'express';
import cors from 'cors';
import path from 'path';
const __dirname = path.resolve();
import 'dotenv/config';
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken';

import { client } from './mongodb.mjs'


const db = client.db("mongocrud");
const col = db.collection("products");



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

        console.log(decoded)
        next();

    } catch (err) {

        // TODO: match all unauth routes
        
        res.status(401).send({ message: "invalid token" })
    }


})

app.use("/api/v1", postRouter) // Secure api

app.use("/api/v1/ping", (req, res) => {
    res.send("OK");
})
// app.use(express.static(path.join(__dirname, 'web/build')))
// app.get(express.static(path.join(__dirname, 'web/build')))
// app.use("*", express.static(path.join(__dirname, 'web/build')))
app.use('/', express.static(path.join(__dirname, 'web/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/web/build/index.html'))
    // res.redirect('/');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Example server listening on port ${PORT}`)
})