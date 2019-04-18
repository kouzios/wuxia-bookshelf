const express = require('express');
const router = express.Router();

let Book = require('./schemas/books.model');

router.route('/add').post(function(req, res) {
    let book = new Book(req.body);
    book.save().then(() => {
        res.status(200).send(req.body.title +' added successfully');
    }).catch(() => {
        res.status(400).send("Unable to add book to database");
    });
});

router.route('/remove').post(function(req, res) {
    Book.find({title: req.body.title}).remove().then(() => {
        res.status(200).send(req.body.title + ' removed successfully');
    }).catch(() => {
        res.status(400).send("Unable to remove book from database");
    });
});

router.route('/updateNovel').post(function(req, res) {
    Book.findOneAndUpdate({title: req.body.title}, req.body).then(() => {
        res.status(200).send(req.body.title + ' updated successfully');
    }).catch(() => {
        res.status(400).send("Unable to update book in database");
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