const express = require('express');
const path = require('path');

const router = express.Router();


//Handles home Page
router.get('/home', handleHome);

function handleHome(req,res)
{
    res.render('pages/home');
}
//Home End

router.get('/browse',viewProducts)

function viewProducts(req,res)
{
    res.render('pages/browse');

}




module.exports = router;