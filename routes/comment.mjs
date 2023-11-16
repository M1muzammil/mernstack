import express from 'express';
import { ObjectId } from 'mongodb'
import admin from "firebase-admin";
import multer, { diskStorage } from 'multer';
import fs from "fs";
import { client } from '../mongodb.mjs';
import 'dotenv/config';
import { OpenAI } from "openai";

const db = client.db("mongocrud");
const userCollection = db.collection("users");
const messagesCollection = db.collection("messages");
const comments = db.collection('postcomment')
const router = express.Router();





////////////// comment on single post from  any authenticated use /////////// 

router.post('/comment',
    (req, res, next) => {
      req.decoded = { ...req.body.decoded };
      next();
    },
    upload.any(),
    async (req, res, next) => {
      try {
        const insertResponse = await comments.insertOne({
          time: new Date(),
          userId: new ObjectId(req.body.userId),
          userName: req.body.userName,
          postId: new ObjectId(req.body.postId),
          comment: req.body.comment,
          authorId: req.body.authorId,
        });
        console.log(insertResponse);
        res.send("comment done");
      } catch (e) {
        console.log("error inserting mongodb: ", e);
        res.status(500).send({ message: "server error, please try later" });
      }
    }
  );
 
  
  router.get("/comments/:postId", async (req, res, next) => {
    const postId = new ObjectId(req.params.postId);
  
    try {
      const qurey = commentsCollection
        .find({ postId: postId })
        .sort({ _id: -1 });
      let results = await qurey.toArray();
      res.send(results);
    } catch (error) {
      console.error(error);
    }
  });

  router.put("/comment/:commentId", async (req, res, next) => {
    const commentId = new ObjectId(req.params.commentId);
  
    const { comment } = req.body;
  
    if (!comment) {
      res
        .status(403)
        .send('Required parameters missing.');
      return;
    }
  
    try {
      const updateResponse = await commentsCollection.updateOne(
        { _id: commentId },
        { $set: { comment } }
      );
  
      if (updateResponse.matchedCount === 1) {
        res.send(`Comment with id ${commentId} updated successfully.`);
      } else {
        res.send("Comment not found with the given id.");
      }
    } catch (error) {
      console.error(error);
    }
  });
  