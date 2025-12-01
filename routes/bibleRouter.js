const express  = require("express");
const axios = require('axios')
const router = express.Router();
const schemas = require("../models/schema");

//GENERAL ROUTES


//BIBLE ROUTES

    //getting full chapter of user-inputted book & chapter
    router.post('/get-full-passage', async(req, res) =>{
        try{
            //0. get essential info for fetching
            let {bibleTranslation, bibleBook, bibleChapter} = req.body;

            //1. call AO bible API
            const result = await axios.get(`https://bible.helloao.org/api/${bibleTranslation}/${bibleBook}/${bibleChapter}.json`)

            //2. return the data
            if (result) {
                //console.log("bible chapter successfully fetched!");
                return res.status(200).json({bibleData: result.data });
              } else {
                console.error("Failed to fetch bible data.");
                return res.status(400).json({ error: "Failed to fetch bible data." });
            }
        }
        catch(err){
            console.log(`there was a backend error fetching full bible passage: ${err}`)
            return res.status(500).json({ error: "Internal server error" });
        }

    })


//COMMENTARY ROUTES

    //GET [retrieve every document]
    router.get('/get-commentary-catalog', async(req, res) =>{
        try{
            //0. base variables
            const commentaryQuery = schemas.commentaryTemplate
            
            //1. getting documents
            const result = await commentaryQuery.find({})

            //2. sending documents to frontend
            res.status(200).json({result})
        }
        catch(err){
            console.log(`there was a backend error getting commentary catalog: ${err}`)
            return res.status(500).json({ error: "Internal server error" });
        }
    })

    //POST [creating commentary collection]
    router.post('/create-commentary-template', async(req, res) =>{
        try{
            //0. base variables
            const commentaryQuery = schemas.commentaryTemplate
            const {commentaryToInsert} = req.body;

            //1. creating commentary in mongodb
            const newCommentaryTemplate =  new commentaryQuery(commentaryToInsert)
            const result = await newCommentaryTemplate.save()
            console.log('template made ! ! !')

        }
        catch(err){
            console.log(`there was a backend error posting commentary template: ${err}`)
            return res.status(500).json({ error: "Internal server error" });
        }
    })

    //PUT [adding chapter to exisiting commentary series]
    router.put('/add-commentary-chapter', async(req, res) =>{
        try{
            //0. base variables
            const commentaryQuery = schemas.commentaryTemplate
            const {chapterToInsert, commentaryName} = req.body

            //1. putting chapter in corresponding commentary template
            const result = await commentaryQuery.updateOne(
                {name:commentaryName},
                {$push: {commentaries: chapterToInsert}}
            )
            console.log("Modified Docments: " + result.modifiedCount)
            if (result){
                return res.status(201).json({ message: "commentary updated successfully!"});
            }

        }
        catch(err){
            console.log(`there was a backend error posting commentary chapters: ${err}`)
            return res.status(500).json({ error: "Internal server error" });
        }
    })


    //POST [retrieving chapter of commentary series]
    router.put('/retrieve-commentary-chapter', async(req, res) =>{
        try{
            //0. base variables
            const commentaryQuery = schemas.commentaryTemplate
            const {commentaryName} = req.body

            //1. putting chapter in corresponding commentary template
            const result = await commentaryQuery.findOne(
                {name:commentaryName},
                {$push: {commentaries: chapterToInsert}}
            )
            console.log("Modified Docments: " + result.modifiedCount)
            if (result){
                return res.status(201).json({ message: "commentary updated successfully!"});
            }

        }
        catch(err){
            console.log(`there was a backend error posting commentary chapters: ${err}`)
            return res.status(500).json({ error: "Internal server error" });
        }
    })


module.exports = router;
