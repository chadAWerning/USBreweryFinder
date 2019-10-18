import * as express from 'express';

const router = module.exports = express.Router();


router.get('/download/:name', (req, res) => {
    const fileName = req.params.name;
    const file = `./${fileName}`
    res.download(file); // Set disposition and send it.
});


