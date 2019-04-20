const express = require('express');
const router = express.Router();

let Book = require('./schemas/books.model');

router.route('/add').post(function(req, res) {
    let book = new Book(req.body);
    //We run a find first to keep our error messages clear and understandable
    Book.find({title: req.body.title}).then((result)=> {
        //If no book of this title found
        if(result.length == 0) {
            book.save().then(() => {
                res.status(200).send(req.body.title +' added successfully');
            }).catch((err) => {
                res.status(400).send("Unable to add book to database");
            });
        } else {
            res.status(400).send(req.body.title + " already exists in the database");
        }
    }).catch((err) => {
        console.log(err);
        res.status(400).send("Unable to search for book in the database")
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
    Book.find({}).then((response) => {
        res.status(200).send(response);
    }).catch(() => {
        res.status(400).send("Unable to retrieve books from database");
    });
});

module.exports = router;