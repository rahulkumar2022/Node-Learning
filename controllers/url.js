const shortid = require('shortid');
const URL = require('../model/url');


async function generateSortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({
        message : 'Please provide url'
    })
    const sortId = shortid();
    await URL.create({
        sortId : sortId,
        redirectUrl : body.url,
        visitHistory : []
    });

    return res.json({id:sortId});
}

module.exports = {
    generateSortUrl
}