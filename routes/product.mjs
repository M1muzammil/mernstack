// import express from 'express';
// import { ObjectId } from 'mongodb'
// import admin from "firebase-admin";
// import multer, { diskStorage } from 'multer';
// import fs from "fs";
// import { client } from '../mongodb.mjs';
// import 'dotenv/config';
// import { OpenAI } from "openai";
// const db = client.db("mongocrud");
// const col = db.collection("products");
// const userCollection = db.collection("users");
// let router = express.Router();

// const storageConfig = diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
//     destination: './uploads/',
//     filename: function (req, file, cb) {
//         console.log("mul-file: ", file);
//         cb(null, `postImg-${new Date().getTime()}-${file.originalname}`)
//     }
// })
// let upload = multer({ storage: storageConfig })
// //==============================================

// // https://firebase.google.com/docs/storage/admin/start
// let serviceAccount = {
//     "type": "service_account",
//     "project_id": "storage-73231",
//     "private_key_id": "5f5d98b5fdaa6e82710c7e6e86d964d1e9058a3e",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCGCY9AwseB8svY\nPbEg5iz+2TM/ikBWzrom4qf6pCb+LCYJeq6BUv9P/Dz2NuQVLYO+zvWuhCfZt1W9\n7X8E+JtNlUoQxlfeGYQfADFamz1dsCQJj2sBeNMZ3Fs0GHpHRhZ0EVMFMERqGMGA\nV3Z43bNXxVlmGpnBw0k1l4eHN9+w+A3uSVM634Zb/lujgx0AteHmQn/L/HHZhn5d\nzOq5HdNA27uhLcDbC9+bc21TnXOL0HmcKHbBP8vfuE3bzfEaN9VBFBr4X17kHx0o\nGuCoTvlm+m9WQIjbMOJ02I3bRjnREcdVJ6TJk2qNz8bBw/pEOMMmiLDJFU0dpC7a\nsTxsC/3lAgMBAAECggEAOrS1KYgmGaRd47ghfGdUDcrTx2CmDV896QocyIpdCbYM\nctpo0/umF0JC8RPZkez9ZvT+ZhE74v+JbkY2+9ZnLvPUHMTCd2R1mZ5b/3M+zWn4\nXreSBnMFAq6gw5B0/gKUkwGDeyJI1K9DERM9sHJpumeVYEMGVPdTeUWE9pRiRP+9\nztn55wtuFwJZejYneo7SEzVaAx8nVyjhOyDvYmoaHPaJ20xv/JsfmisyDh5GIkCz\neCjed3AwVebZGAXknH0rUgXBi6dsKe6OdrWnQv5R84sujszYHIFSYEPmGZJtAP7H\nUFDyK7r5frh+WwJBEoz6pZmJ+x1YnCFw/P+NMILBgQKBgQC8y4XfcCzgyYIsgBb6\n+mf5NTTm+/E+ZXnx6hDp+0Iwn0azs/ADNmwMU44Tjr4MThv9983sa6usI4e0hjtE\nU3zXL5ElKUiii1wA+vmVk5fyltKEoFJU5N7cYdCyamkMaWnObQHKmrpCuqrWFuUe\n2xGjkbbqVJpkVdmISfiV6zz8iwKBgQC1wBb+xTpOgTb4qJAT5CSzBOSq3BdhM/nH\nx1YF2VBkoyVhYcTq8LnUhJbB/4TAkLG4frbOiogRaTfisOib6qynLC+8SgOv64Cu\nQIAQEc+rU7+6iE7j985S1Oaxy6+9pFchlXO+Pm2Dx0ha8jbLPjfYERJrzOMwMAOc\n4DL+jBUNTwKBgHPR853ghlecp3Q/XFm59sEmh/7QPu5FeKsVKi0wzClh/RDPaYW/\nBEgHllifMC4CWR/Tvwuz/gxLe7wewQsooKSudL+0dO/qyJV9YlIFyqizKBDe/cNA\n6QuQImTh7PIFVTijHP87LtszAwz13LeyMz8CbJGTN2goVpxKrOrj9nUDAoGADQD2\nZDoWRuGl3jqpPFMZcRmLhtICdjjyySFw/TAkOV8W4JXPMgQRN6xY4P54MBLqNEoU\nqEhvHdfKYNTJf8ZVngxiSfV9uAuAhHcm8n9jvV1bnWv9QQBM6c5DxzrMkyP7+/Im\netkamtAaVC96TiZgdnwaNk5Nfvggegvsehvpsa8CgYAuL751yEx6v4k35JU1dm69\nPt4D2wie6UxwyYslcnHXy6JSyvNZZZ3dJGMxYoj9JEQ9EMJPZ3sw/3oUAbyNzseZ\nEg/nMDTTGl1Op+HN+X9HZ+uKJcEdOR7AGsuf/cx9GIIyFJiXGhsQCuIrpwy7Xg0P\nf3gIZzTPBEgwKZ1pZ/Lj8A==\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-6mrkt@storage-73231.iam.gserviceaccount.com",
//     "client_id": "100861013432211712340",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6mrkt%40storage-73231.iam.gserviceaccount.com",
//     "universe_domain": "googleapis.com"
// }
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     // databaseURL: "https://smit-b9.firebaseio.com"

// });
// const bucket = admin.storage().bucket("gs://storage-73231.appspot.com");

// // POST    /api/v1/post post with image 


// router.post('/post', (req, res, next) => {
//     req.decoded = { ...req.body.decoded }
//     next();
// },
//     upload.any(),
//     async (req, res, next) => {
//         console.log("req.body: ", req.body);
//         if (!req.body.title || !req.body.text) {
//             res.status(403);
//             res.send(`required parameters missing,  example request body: { title: "abc post title", text: "some post text" } `);
//             return;
//         }
//         console.log("req.files: ", req.files);
//         if (req.files[0].size > 2000000000) { // size bytes, limit of 2MB
//             res.status(403).send({ message: 'File size limit exceed, max limit 2MB' });
//             return;
//         }
//         bucket.upload(
//             req.files[0].path,
//             {
//                 destination: `profile/${req.files[0].filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
//             },
//             function (err, file, apiResponse) {
//                 if (!err) {
//                     // console.log("api resp: ", apiResponse);

//                     // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
//                     file.getSignedUrl({
//                         action: 'read',
//                         expires: '03-09-2491'
//                     }).then(async (urlData, err) => {
//                         if (!err) {
//                             console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 


//                             try {
//                                 const insertResponse = await col.insertOne({
//                                     // _id: "7864972364724b4h2b4jhgh42",
//                                     title: req.body.title,
//                                     text: req.body.text,
//                                     img: urlData[0],
//                                     authorEmail: req.decoded.email,
//                                     authorId: new ObjectId(req.decoded._id),
//                                     time: new Date(),
//                                     firstName: req.body.firstName,
//                                     lastName: req.body.lastName
//                                 });
//                                 console.log("insertResponse: ", insertResponse);

//                                 res.send({ message: 'post created' });
//                             } catch (e) {
//                                 console.log("error inserting mongodb: ", e);
//                                 res.status(500).send({ message: 'server error, please try later' });
//                             }



//                             // // delete file from folder before sending response back to client (optional but recommended)
//                             // // optional because it is gonna delete automatically sooner or later
//                             // // recommended because you may run out of space if you dont do so, and if your files are sensitive it is simply not safe in server folder

//                             try {
//                                 fs.unlinkSync(req.files[0].path)
//                                 //file removed
//                             } catch (err) {
//                                 console.error(err)
//                             }
//                         }
//                     })
//                 } else {
//                     console.log("err: ", err)
//                     res.status(500).send({
//                         message: "server error"
//                     });
//                 }
//             });




//     })

// //openai api key

// const openaiClient = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,

// });
// router.get('/search', async (req, res, next) => {

//     try {
//         const response = await openaiClient.embeddings.create({
//             model: "text-embedding-ada-002",
//             input: req.query.q,
//         });
//         const vector = response?.data[0]?.embedding
//         console.log("vector: ", vector);
//         // [ 0.0023063174, -0.009358601, 0.01578391, ... , 0.01678391, ]

//         // Query for similar documents.
//         const documents = await col.aggregate([
//             {
//                 "$search": {
//                     "index": "default",
//                     "knnBeta": {
//                         "vector": vector,
//                         "path": "plot_embedding",
//                         "k": 10 // number of documents
//                     },
//                     "scoreDetails": true

//                 }
//             },
//             {
//                 "$project": {
//                     "embedding": 0,
//                     "score": { "$meta": "searchScore" },
//                     "scoreDetails": { "$meta": "searchScoreDetails" }
//                 }
//             }
//         ]).toArray();
//         console.log(documents);
//         console.log("Search done")

//         res.send(documents);


//         documents.map(eachMatch => {
//             console.log(`score ${eachMatch?.score?.toFixed(3)} => ${JSON.stringify(eachMatch)}\n\n`);
//         })
//         console.log(`${documents.length} records found `);


//     } catch (e) {
//         console.log("error getting data mongodb: ", e);
//         res.status(500).send('server error, please try later');
//     }

// })

// // all post 

// router.get('/feed', async (req, res, next) => {

//     const cursor = col.find({})
//         .sort({ _id: -1 })
//         .limit(100);

//     try {
//         let results = await cursor.toArray()
//         console.log("results: ", results);
//         res.send(results);
//     } catch (e) {
//         console.log("error getting data mongodb: ", e);
//         res.status(500).send('server error, please try later');
//     }

// })


// // ping auth

// router.use('/ping', async (req, res, next) => {

//     try {
//         let result = await userCollection.findOne({ email: req.body.decoded.email });
//         console.log("result: ", result); // [{...}] []
//         res.send({
//             message: 'profile fetched',
//             data: {
//                 isAdmin: result.isAdmin,
//                 firstName: result.firstName,
//                 lastName: result.lastName,
//                 email: result.email,
//                 userId: result._id,
//                 profileImage: result.profileImage,
//             }
//         });

//     } catch (e) {
//         console.log("error getting data mongodb: ", e);
//         res.status(401).send('UnAuthorized');
//     }
// })

// // single post

// router.put('/post/:postId', async (req, res, next) => {

//     if (!ObjectId.isValid(req.params.postId)) {
//         res.status(403).send(`Invalid post id`);
//         return;
//     }

//     if (!req.body.text
//         && !req.body.title) {
//         res.status(403).send(`required parameter missing, atleast one key is required.
//         example put body: 
//         PUT     /api/v1/post/:postId
//         {
//             title: "updated title",
//             text: "updated text"
//         }
//         `)
//     }

//     let dataToBeUpdated = {};

//     // if (req.body.title) { dataToBeUpdated.title = req.body.title }
//     if (req.body.text) { dataToBeUpdated.text = req.body.text }


//     try {
//         const updateResponse = await col.updateOne(
//             {
//                 _id: new ObjectId(req.params.postId)
//             },
//             {
//                 $set: dataToBeUpdated
//             });
//         console.log("updateResponse: ", updateResponse);

//         res.send('post updated');
//     } catch (e) {
//         console.log("error inserting mongodb: ", e);
//         res.status(500).send('server error, please try later');
//     }
// })


// //profile

// router.get('/profile/:userId', async (req, res, next) => {

//     const userId = req.params.userId || req.body.decoded.userId

//     if (!ObjectId.isValid(userId)) {
//         res.status(403).send(`Invalid user id`);
//         return;
//     }

//     try {
//         let result = await userCollection.findOne({ _id: new ObjectId(userId) });
//         console.log("result: ", result);
//         res.send({
//             message: 'profile fetched',
//             data: {
//                 isAdmin: result.isAdmin,
//                 firstName: result.firstName,
//                 lastName: result.lastName,
//                 email: result.email,
//                 userId: result._id,
//                 time: new Date(),
//                 userId: new ObjectId(req.body.userId),

//             },
//             id: userId
//         });

//     } catch (e) {
//         console.log("error getting data mongodb: ", e);
//         res.status(500).send('server error, please try later');
//     }
// })

// // DELETE  /api/v1/post/:postId

// router.delete('/post/:postId', async (req, res, next) => {

//     if (!ObjectId.isValid(req.params.postId)) {
//         res.status(403).send(`Invalid post id`);
//         return;
//     }

//     try {
//         const deleteResponse = await col.deleteOne({ _id: new ObjectId(req.params.postId) });
//         console.log("deleteResponse: ", deleteResponse);
//         res.send('post deleted');
//     } catch (e) {
//         console.log("error deleting mongodb: ", e);
//         res.status(500).send('server error, please try later');
//     }
// })

// //logout

// router.post("/logout", async (req, res, next) => {
//     res.clearCookie("token")
//     res.send({ message: 'Logout successful' });
// });


// router.post('/post/:postId/dolike', async (req, res, next) => {

//     if (!ObjectId.isValid(req.params.postId)) {
//         res.status(403).send(`Invalid post id`);
//         return;
//     }

//     try {
//         const doLikeResponse = await col.updateOne(
//             { _id: new ObjectId(req.params.postId) },
//             {
//                 $addToSet: {
//                     likes: new ObjectId(req.body.decoded._id)
//                 }
//             }
//         );
//         console.log("doLikeResponse: ", doLikeResponse);
//         res.send('like done');
//     } catch (e) {
//         console.log("error like post mongodb: ", e);
//         res.status(500).send('server error, please try later');
//     }
// })









// // POST    /api/v1/post
// // router.post('/post', async (req, res, next) => {
// //     console.log('this is signup!', new Date());

// //     if (
// //         !req.body.title
// //         || !req.body.text
// //     ) {
// //         res.status(403);
// //         res.send(`required parameters missing, 
// //         example request body:
// //         {
// //             title: "abc post title",
// //             text: "some post text"
// //         } `);
// //         return;
// //     }

// //     try {
// //         const insertResponse = await col.insertOne({
// //             userId: new ObjectId(req.body.userId),
// //             title: req.body.title,
// //             text: req.body.text,
// //             authorEmail: req.body.decoded.email,
// //             authorId: new ObjectId(req.body.decoded._id),
// //             // createdOn: new Date(),
// //             time: new Date()
// //         });
// //         console.log("insertResponse: ", insertResponse);

// //         res.send({ message: 'post created' });
// //     } catch (e) {
// //         console.log("error inserting mongodb: ", e);
// //         res.status(500).send({ message: 'server error, please try later' });
// //     }
// // })





// export default router


import express from 'express';


import { ObjectId } from 'mongodb'

import admin from "firebase-admin";
import multer, { diskStorage } from 'multer';
import fs from "fs";


import { client } from '../mongodb.mjs';


import 'dotenv/config';
import { OpenAI } from "openai"; 
const storageConfig = diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {
        console.log("mul-file: ", file);
        cb(null, `postImg-${new Date().getTime()}-${file.originalname}`)
    }
})
let upload = multer({ storage: storageConfig })
//==============================================



// https://firebase.google.com/docs/storage/admin/start
let serviceAccount = {
    "type": "service_account",
    "project_id": "storage-73231",
    "private_key_id": "5f5d98b5fdaa6e82710c7e6e86d964d1e9058a3e",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCGCY9AwseB8svY\nPbEg5iz+2TM/ikBWzrom4qf6pCb+LCYJeq6BUv9P/Dz2NuQVLYO+zvWuhCfZt1W9\n7X8E+JtNlUoQxlfeGYQfADFamz1dsCQJj2sBeNMZ3Fs0GHpHRhZ0EVMFMERqGMGA\nV3Z43bNXxVlmGpnBw0k1l4eHN9+w+A3uSVM634Zb/lujgx0AteHmQn/L/HHZhn5d\nzOq5HdNA27uhLcDbC9+bc21TnXOL0HmcKHbBP8vfuE3bzfEaN9VBFBr4X17kHx0o\nGuCoTvlm+m9WQIjbMOJ02I3bRjnREcdVJ6TJk2qNz8bBw/pEOMMmiLDJFU0dpC7a\nsTxsC/3lAgMBAAECggEAOrS1KYgmGaRd47ghfGdUDcrTx2CmDV896QocyIpdCbYM\nctpo0/umF0JC8RPZkez9ZvT+ZhE74v+JbkY2+9ZnLvPUHMTCd2R1mZ5b/3M+zWn4\nXreSBnMFAq6gw5B0/gKUkwGDeyJI1K9DERM9sHJpumeVYEMGVPdTeUWE9pRiRP+9\nztn55wtuFwJZejYneo7SEzVaAx8nVyjhOyDvYmoaHPaJ20xv/JsfmisyDh5GIkCz\neCjed3AwVebZGAXknH0rUgXBi6dsKe6OdrWnQv5R84sujszYHIFSYEPmGZJtAP7H\nUFDyK7r5frh+WwJBEoz6pZmJ+x1YnCFw/P+NMILBgQKBgQC8y4XfcCzgyYIsgBb6\n+mf5NTTm+/E+ZXnx6hDp+0Iwn0azs/ADNmwMU44Tjr4MThv9983sa6usI4e0hjtE\nU3zXL5ElKUiii1wA+vmVk5fyltKEoFJU5N7cYdCyamkMaWnObQHKmrpCuqrWFuUe\n2xGjkbbqVJpkVdmISfiV6zz8iwKBgQC1wBb+xTpOgTb4qJAT5CSzBOSq3BdhM/nH\nx1YF2VBkoyVhYcTq8LnUhJbB/4TAkLG4frbOiogRaTfisOib6qynLC+8SgOv64Cu\nQIAQEc+rU7+6iE7j985S1Oaxy6+9pFchlXO+Pm2Dx0ha8jbLPjfYERJrzOMwMAOc\n4DL+jBUNTwKBgHPR853ghlecp3Q/XFm59sEmh/7QPu5FeKsVKi0wzClh/RDPaYW/\nBEgHllifMC4CWR/Tvwuz/gxLe7wewQsooKSudL+0dO/qyJV9YlIFyqizKBDe/cNA\n6QuQImTh7PIFVTijHP87LtszAwz13LeyMz8CbJGTN2goVpxKrOrj9nUDAoGADQD2\nZDoWRuGl3jqpPFMZcRmLhtICdjjyySFw/TAkOV8W4JXPMgQRN6xY4P54MBLqNEoU\nqEhvHdfKYNTJf8ZVngxiSfV9uAuAhHcm8n9jvV1bnWv9QQBM6c5DxzrMkyP7+/Im\netkamtAaVC96TiZgdnwaNk5Nfvggegvsehvpsa8CgYAuL751yEx6v4k35JU1dm69\nPt4D2wie6UxwyYslcnHXy6JSyvNZZZ3dJGMxYoj9JEQ9EMJPZ3sw/3oUAbyNzseZ\nEg/nMDTTGl1Op+HN+X9HZ+uKJcEdOR7AGsuf/cx9GIIyFJiXGhsQCuIrpwy7Xg0P\nf3gIZzTPBEgwKZ1pZ/Lj8A==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-6mrkt@storage-73231.iam.gserviceaccount.com",
    "client_id": "100861013432211712340",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6mrkt%40storage-73231.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: "https://smit-b9.firebaseio.com"
});
const bucket = admin.storage().bucket("gs://storage-73231.appspot.com");






const db = client.db("mongocrud");
const col = db.collection("products");
const userCollection = db.collection("users");
let router = express.Router();
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
// router.post('/post', async (req, res, next) => {
//     console.log('this is signup!', new Date());

//     if (
//         !req.body.title
//         || !req.body.text
//     ) {
//         res.status(403);
//         res.send(`required parameters missing, 
//         example request body:
//         {
//             title: "abc post title",
//             text: "some post text"
//         } `);
//         return;
//     }

//     try {
//         const insertResponse = await col.insertOne({
//             userId: new ObjectId(req.body.userId),
//             title: req.body.title,
//             text: req.body.text,
//             authorEmail: req.body.decoded.email,
//             authorId: new ObjectId(req.body.decoded._id),
//             // createdOn: new Date(),
//             time: new Date()
//         });
//         console.log("insertResponse: ", insertResponse);

//         res.send({ message: 'post created' });
//     } catch (e) {
//         console.log("error inserting mongodb: ", e);
//         res.status(500).send({ message: 'server error, please try later' });
//     }
// })


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

// router.get('/posts/:userId', async (req, res, next) => {
//     const userId = req.params.userId;

//     if (!ObjectId.isValid(userId)) {
//         res.status(403).send(`Invalid user id`);
//         return;
//     }

//     try {
//         const cursor = col.find({ userId: new ObjectId(userId) }).sort({ _id: -1 });
//         const results = await cursor.toArray();

//         console.log(userId);
//         res.send(results);

//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });



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
  

// ping auth

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
                profileImage: result.profileImage,
            }
        });

    } catch (e) {
        console.log("error getting data mongodb: ", e);
        res.status(401).send('UnAuthorized');
    }
})
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

    // if (req.body.title) { dataToBeUpdated.title = req.body.title }
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
                time: new Date(),
                userId: new ObjectId(req.body.userId),
               
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





// POST    /api/v1/post
router.post('/post',
    (req, res, next) => {
        req.decoded = { ...req.body.decoded }
        next();
    },
    upload.any(),

    async (req, res, next) => {
        console.log("req.body: ", req.body);

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


        // TODO: save file in storage bucket and get public url

        console.log("req.files: ", req.files);

        if (req.files[0].size > 2000000000) { // size bytes, limit of 2MB
            res.status(403).send({ message: 'File size limit exceed, max limit 2MB' });
            return;
        }

        bucket.upload(
            req.files[0].path,
            {
                destination: `profile/${req.files[0].filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
            },
            function (err, file, apiResponse) {
                if (!err) {
                    // console.log("api resp: ", apiResponse);

                    // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
                    file.getSignedUrl({
                        action: 'read',
                        expires: '03-09-2491'
                    }).then(async (urlData, err) => {
                        if (!err) {
                            console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 


                            try {
                                const insertResponse = await col.insertOne({
                                    // _id: "7864972364724b4h2b4jhgh42",
                                     title: req.body.title,
                                    text: req.body.text,
                                    img: urlData[0],
                                    authorEmail: req.decoded.email,
                                    authorId: new ObjectId(req.decoded._id),
                                    time: new Date(),
                                    firstName : req.body.firstName,
                                    lastName: req.body.lastName
                                });
                                console.log("insertResponse: ", insertResponse);

                                res.send({ message: 'post created' });
                            } catch (e) {
                                console.log("error inserting mongodb: ", e);
                                res.status(500).send({ message: 'server error, please try later' });
                            }



                            // // delete file from folder before sending response back to client (optional but recommended)
                            // // optional because it is gonna delete automatically sooner or later
                            // // recommended because you may run out of space if you dont do so, and if your files are sensitive it is simply not safe in server folder

                            try {
                                fs.unlinkSync(req.files[0].path)
                                //file removed
                            } catch (err) {
                                console.error(err)
                            }
                        }
                    })
                } else {
                    console.log("err: ", err)
                    res.status(500).send({
                        message: "server error"
                    });
                }
            });




    })





export default router