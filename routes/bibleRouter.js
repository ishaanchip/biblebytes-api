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

    //getting all chapter summaries of bible version
    router.post('/get-chapter-summaries', async(req, res) =>{
        try{
            //0. get essential fetch info
            let {bibleTranslation} = req.body
            let chapterOverviewQuery = schemas.chapterOverviewTemplate

            //1. retrieve data from MONGODB
            let result = await chapterOverviewQuery.findOne({
                version:bibleTranslation
            })

            //2. return data

            if (result) {
                return res.status(200).json({chapterSummaries: result });
              } 
              else {
                console.error("Failed to fetch bible summaries.");
                return res.status(400).json({ error: "Failed to fetch bible summaries." });
            }
        }
        catch(err){
            console.log(`there was a backend error fetching bible summaries: ${err}`)
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
















    //ONE TIME USE FUNCTIONS
    router.post('/post_key_books', async(req, res)  =>{
        try{
            //0. base variables
            const chapterOverviewQuery = schemas.chapterOverviewTemplate;
            const {chapterOverviewInsert} = req.body

            //1. creating base --> mongodb
            const newChapterOverview = new chapterOverviewQuery(chapterOverviewInsert)
            const result = await newChapterOverview.save()
            console.log('template made ! ! !')


        }
        catch(err){
            console.log(`there was a backend error posting key books: ${err}`)
            return res.status(500).json({ error: "Internal server error" });
        }
    })

    router.put('/put_book_summaries', async(req, res)  =>{
        try{
            //0. base variables
            const chapterOverviewQuery = schemas.chapterOverviewTemplate;
            const {summaryStorage, currentBook} = req.body

            let queryKey = `books.${currentBook}`

            //1. putting chapter in corresponding commentary template
            const result = await chapterOverviewQuery.updateOne(
                {version:"BSB"},
                {$set: {[queryKey]: summaryStorage}}
            )

            console.log("Modified Docments: " + result.modifiedCount)
            if (result){
                return res.status(201).json({ message: "summaries updated successfully!"});
            }



        }
        catch(err){
            console.log(`there was a backend error posting key books: ${err}`)
            return res.status(500).json({ error: "Internal server error" });
        }
    })


module.exports = router;
