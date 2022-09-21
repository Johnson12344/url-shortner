const express = require('express');
const path = require('path');
const app = express();
const logger = require('../middlewares/logger')
const genrateSlug = require('../middlewares/generateSlug')


app.use(logger)
app.use(express.urlencoded({extended: false }));
app.use(express.json());
const data = []
app.get('/', (req,res)=>{
    const filePath = path.join(__dirname, "../index.html")
    res.sendFile(filePath)

})

app.get('/:slug', async (req, res)=>{
    // fetch all urls from data.json
   
    // filter out the url that matches with req.slug
    let url = data.find((item)=>{
        return item.slug === req.params.slug
    })
    if(url){

        // redirect user back to the original url
       return res.redirect(url.originalURL);
    }
    res.status(404).send();
})
app.post('/', genrateSlug,async (req, res) =>{

    let link = {
        originalURL: req.body.urlInput,
        slug: req.slug,
        shortURL: `${req.protocol}://${req.get('host')}/${req.slug}`
    }

    data.push(link);
    res.status(200).json(link)
})

module.exports = app;