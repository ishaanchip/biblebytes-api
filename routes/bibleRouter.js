const express  = require("express");
const axios = require('axios')
const router = express.Router();
const schemas = require("../models/schema");

//GENERAL ROUTES


//HOME ROUTES

    //getting full chapter of user-inputted book & chapter
    router.post('/get-full-passage', async(req, res) =>{
        try{
            //0. get essential info for fetching
            let {bibleTranslation, bibleBook, bibleChapter} = req.body;

            //1. call AO bible API
            const result = await axios.get(`https://bible.helloao.org/api/${bibleTranslation}/${bibleBook}/${bibleChapter}.json`)

            //2. return the data
            if (result) {
                console.log(result.data)
                console.log("bible chapter successfully fetched!");
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




module.exports = router;
