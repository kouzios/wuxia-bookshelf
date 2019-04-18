const express = require('express');
const router = express.Router();

let Book = require('./schemas/books.model');

router.route('/add').post(function(req, res){
    let book = new Book(req.body);
    book.save().then(() => {
        res.status(200).send('Book ' + req.body.title +' added successfully');
    }).catch(()=>{
        res.status(400).send("Unable to add book to database");
    });
});

router.route('/getAll').get(function(req, res) {
    Book.init().then(()=> {
        Book.find(function(err, books) {
            if(err) {
                res.json(err);
            }
            res.json(books);
        });
    });
});

module.exports = router;