
import express from 'express';

import { client } from '../mongodb.mjs';
const db = client.db("mongocrud");
const col = db.collection("products");
const userCollection = db.collection("users");
let router = express.Router();
import { ObjectId } from 'mongodb';
import 'dotenv/config';
import { OpenAI } from "openai"; // Import OpenAI as a named import

// Remove the following line as it's causing a conflict
// const { OpenAI } = require('openai');

const openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    
});




router.get('/search', async (req, res, next) => {

    try {
        const response = await openaiClient.embeddings.create({
            model: "text-embedding-ada-002",
            input: req.query.q,
        });
        const vector = response?.data[0]?.embedding
        console.log("vector: ", vector);
        // [ 0.0023063174, -0.009358601, 0.01578391, ... , 0.01678391, ]

        // Query for similar documents.
        const documents = await col.aggregate([
            {
                "$search": {
                    "index": "default",
                    "knnBeta": {
                        "vector": vector,
                        "path": "plot_embedding",
                        "k": 10 // number of documents
                    },
                    "scoreDetails": true

                }
            },
            {
                "$project": {
                    "embedding": 0,
                    "score": { "$meta": "searchScore" },
                    "scoreDetails": { "$meta": "searchScoreDetails" }
                }
            }
        ]).toArray();
        console.log(documents);
        console.log("Search done")

        res.send(documents);
        

        documents.map(eachMatch => {
            console.log(`score ${eachMatch?.score?.toFixed(3)} => ${JSON.stringify(eachMatch)}\n\n`);
        })
        console.log(`${documents.length} records found `);


    } catch (e) {
        console.log("error getting data mongodb: ", e);
        res.status(500).send('server error, please try later');
    }

})





// POST    /api/v1/post
router.post('/post', async (req, res, next) => {
    console.log('this is signup!', new Date());

    if (
        !req.body.title
        || !req.body.text
    ) {
        res.status(403);
        res.send(`required parameters missing, 
        example request body:
        {
            title: "abc post title",
            text: "some post text"
        } `);
        return;
    }

    try {
        const insertResponse = await col.insertOne({
            userId: new ObjectId(req.body.userId),
            title: req.body.title,
            text: req.body.text,
            authorEmail: req.body.decoded.email,
            authorId: new ObjectId(req.body.decoded._id),
            // createdOn: new Date(),
            time: new Date()
        });
        console.log("insertResponse: ", insertResponse);

        res.send({ message: 'post created' });
    } catch (e) {
        console.log("error inserting mongodb: ", e);
        res.status(500).send({ message: 'server error, please try later' });
    }
})


router.get('/feed', async (req, res, next) => {

    const cursor = col.find({})
        .sort({ _id: -1 })
        .limit(100);

    try {
        let results = await cursor.toArray()
        console.log("results: ", results);
        res.send(results);
    } catch (e) {
        console.log("error getting data mongodb: ", e);
        res.status(500).send('server error, please try later');
    }

})





router.get('/posts', async (req, res, next) => {
    const cursor = col.find({}).sort({ _id: -1 }).limit(100);

    try {
        const results = await cursor.toArray();
        
        // Fetch user information for each post and add it to the results
        for (const post of results) {
            const user = await userCollection.findOne({ _id: post.authorId });
            if (user) {
                post.user = user; // Include the entire user object
        console.log("User's name:", user.name);
            }
        }

        res.send(results);
    } catch (e) {
        console.log("error getting data from MongoDB: ", e);
        res.status(500).send('Server error, please try later');
    }
});

router.get('/posts/:userId', async (req, res, next) => {
    const userId = req.params.userId;

    if (!ObjectId.isValid(userId)) {
        res.status(403).send(`Invalid user id`);
        return;
    }

    try {
        const cursor = col.find({ userId: new ObjectId(userId) }).sort({ _id: -1 });
        const results = await cursor.toArray();

        console.log(userId);
        res.send(results);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});



router.get('/post/:postId', async (req, res, next) => {

    console.log(req.params.postId);

    const postId = new ObjectId(req.params.postId);

    try {
        const post = await col.findOne({ _id: postId });

        if (post) {
            res.send(post);
        } else {
            res.status(404).send('Post not found with id ' + postId);
        }
    } catch (error) {
        console.error(error);
        console.log(postId)
    }
});







router.get('/posts/:userId', async (req, res, next) => {
    const userId = req.params.userId;
  
    if (!ObjectId.isValid(userId)) {
      res.status(403).send(`Invalid user id`);
      return;
    }
  
    try {
      // Use the "authorId" field to filter posts by the user's ID
      const cursor = col.find({ authorId: new ObjectId(userId) }).sort({ _id: -1 });
      const results = await cursor.toArray();
  
      console.log("=====>", results);
      res.send({results:results, userId:userId});
    } catch (error) {
      console.error(error); 
      res.status(500).send('Server error');
    }
  });
  

// const getProfileMiddleware = async (req, res, next) => {

//     const userId = req.params.userId || req.body.decoded._id;

//     if (!ObjectId.isValid(userId)) {
//         res.status(403).send(`Invalid user id`);
//         return;
//     }

//     try {
//         let result = await userCollection.findOne({ _id: new ObjectId(userId) });
//         console.log("result: ", result); // [{...}] []
//         res.send({
//             message: 'profile fetched',
//             data: {
//                 isAdmin: result?.isAdmin,
//                 firstName: result?.firstName,
//                 lastName: result?.lastName,
//                 email: result?.email,
//                 _id: result?._id
//             }
//         });
//     } catch (e) {
//         console.log("error getting data mongodb: ", e);
//         res.status(500).send('server error, please try later');
//     }
// }
// router.get('/profile', getProfileMiddleware)
// router.get('/profile/:userId', getProfileMiddleware)

router.put('/post/:postId', async (req, res, next) => {

    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send(`Invalid post id`);
        return;
    }

    if (!req.body.text
        && !req.body.title) {
        res.status(403).send(`required parameter missing, atleast one key is required.
        example put body: 
        PUT     /api/v1/post/:postId
        {
            title: "updated title",
            text: "updated text"
        }
        `)
    }

    let dataToBeUpdated = {};

    if (req.body.title) { dataToBeUpdated.title = req.body.title }
    if (req.body.text) { dataToBeUpdated.text = req.body.text }


    try {
        const updateResponse = await col.updateOne(
            {
                _id: new ObjectId(req.params.postId)
            },
            {
                $set: dataToBeUpdated
            });
        console.log("updateResponse: ", updateResponse);

        res.send('post updated');
    } catch (e) {
        console.log("error inserting mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})


//profile
router.get('/profile/:userId', async (req, res, next) => {

    const userId = req.params.userId || req.body.decoded.userId

    if (!ObjectId.isValid(userId)) {
        res.status(403).send(`Invalid user id`);
        return;
    }

    try {
        let result = await userCollection.findOne({ _id: new ObjectId(userId) });
        console.log("result: ", result);
        res.send({
            message: 'profile fetched',
            data: {
                isAdmin: result.isAdmin,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                userId: result._id,
            },
            id: userId
        });

    } catch (e) {
        console.log("error getting data mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})














// DELETE  /api/v1/post/:postId
router.delete('/post/:postId', async (req, res, next) => {

    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send(`Invalid post id`);
        return;
    }

    try {
        const deleteResponse = await col.deleteOne({ _id: new ObjectId(req.params.postId) });
        console.log("deleteResponse: ", deleteResponse);
        res.send('post deleted');
    } catch (e) {
        console.log("error deleting mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})

router.use('/ping', async (req, res, next) => {

    try {
        let result = await userCollection.findOne({ email: req.body.decoded.email });
        console.log("result: ", result); // [{...}] []
        res.send({
            message: 'profile fetched',
            data: {
                isAdmin: result.isAdmin,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                userId: result._id,
            }
        });

    } catch (e) {
        console.log("error getting data mongodb: ", e);
        res.status(401).send('UnAuthorized');
    }
})











router.get('/postss', async (req, res, next) => {

    const userId = req.query._id

    if (!ObjectId.isValid(userId) && userId !== undefined) {
        res.status(403).send(`Invalid user id`);
        return;
    }

    const cursor = col.find({ authorId: new ObjectId(userId) })
        .sort({ _id: -1 })
        .limit(5);

    try {
        let results = await cursor.toArray()
        console.log("results: ", results);
        res.send(results);
    } catch (e) {
        console.log("error getting data mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})
















router.post("/logout", async (req, res, next) => {
    res.clearCookie("token")
    res.send({ message: 'Logout successful' });
});


router.post('/post/:postId/dolike', async (req, res, next) => {

    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send(`Invalid post id`);
        return;
    }

    try {
        const doLikeResponse = await col.updateOne(
            { _id: new ObjectId(req.params.postId) },
            {
                $addToSet: {
                    likes: new ObjectId(req.body.decoded._id)
                }
            }
        );
        console.log("doLikeResponse: ", doLikeResponse);
        res.send('like done');
    } catch (e) {
        console.log("error like post mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})





export default router
