const express = require('express');
const path = require('path');
const app = express();
const port = 4000;
const logger = require('./middlewares/logger')
const genrateSlug = require('./middlewares/generateSlug')
const fs = require("fs/promises");

app.use(logger)
app.use(express.urlencoded({extended: false }));
app.use(express.json());
app.use(express.static('low'))
app.get('/', (req,res)=>{
    const filePath = path.resolve('index.html')
    res.sendFile(filePath)

})

app.get('/:slug', async (req, res)=>{
    // fetch all urls from data.json
    let data;
    try {
        data = await fs.readFile(path.resolve('data.json'),'utf-8');
        // convert data from string to array using JSON.parse
         data = JSON.parse(data)
        
    } catch (error) {
        data = [];
    }
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
    let data;
    console.log(req.slug);
    try{
        let data = await fs.readFile(path.resolve('data.json'), 'r', 'utf-8');
        data = JSON.parse(data);
    }catch (error){
        data = [];
    }
    let link = {
        originalURL: req.body.urlInput,
        slug: req.slug,
        shortURL: `${req.protocol}://${req.get('host')}/${req.slug}`
    }

    data.push(link);
    await fs.writeFile(path.resolve('data.json'), JSON.stringify(data), 'utf-8')
    console.log(req.slug);
    console.log(req.body);
    res.status(200).json(link)
})


app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`)
});