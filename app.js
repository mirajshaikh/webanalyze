const express = require('express')
const Wappalyzer = require('wappalyzer');
const { response } = require('express');

const app = express()
const port = 3000


//app.get('/', (req, res) => res.send('Hello World!'))



const options = {
    debug: false,
    delay: 500,
    maxDepth: 0,
    maxUrls: 1,
    maxWait: 5000,
    recursive: true,
    userAgent: 'Wappalyzer',
    htmlMaxCols: 2000,
    htmlMaxRows: 2000,
};



app.get('/', async(req, res) => {
    let url = req.query.url;
    if (!url) {
        res.send('Invalid URL')
    } else {
        const wappalyzer = await new Wappalyzer(options)

        try {
            await wappalyzer.init()

            const site = await wappalyzer.open(url)

            // Optionally capture and output errors
            site.on('error', console.error)

            const results = await site.analyze()

            res.json(results, null, 2)

        } catch (error) {
            response.send(error)
        }
        await wappalyzer.destroy()


    }
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))