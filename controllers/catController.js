var Cat = require('../models/cat');

// Display list of all cats.
exports.cat_list = function(req, res, next) {
    
    Cat.find({}, 'cat_name cat_comment')
    .sort([['cat_name', 'ascending']])
    .exec(function (err, list_cats) {
        if(err) { return next(err) }
         
        // Successful, so render
        res.json( list_cats );
    });
};


// Display specific page for specifc Cat.
exports.cat_detail = function(req, res, next) {

    Cat.findById(req.params.id)
    .exec(function (err, detail_cat) {
        if (err) { return next(err) }

        res.json(detail_cat);
    });
};


// Handle Cat Add on POST
exports.cat_add = function(req, res, next) {
    
    // Create a cat object (Data is validated from React)
    var cat = new Cat(
        {
            cat_name: req.body.cat_name,
            cat_pic: req.body.cat_pic,
            cat_breed: req.body.cat_breed,
            cat_age: req.body.cat_age,
            cat_comment: req.body.cat_comment,
            cat_detail: req.body.cat_detail,
            cat_adopted: req.body.cat_adopted
        });

    cat.save(function (err) {
        if (err) { return next(err); }
        // Successful - redirect to Home.
        res.sendStatus(200);
    });

};


// Handle Cat Delete on POST
exports.cat_delete = function(req, res, next) {

    Cat.findOneAndDelete(req.params.id, function deleteCatData(err) {
        if (err) { 
            console.log('Error is There?', err);
            res.send(500);
            return next(err); 
        }
        // Success -send success status
        res.sendStatus(200);
    })

};



// Handle Cat update on POST.
exports.cat_update = function(req, res, next) {

    console.log(req.params.id);

    var catData = 
        {
            cat_name: req.body.cat_name,
            cat_pic: req.body.cat_pic,
            cat_breed: req.body.cat_breed,
            cat_age: req.body.cat_age,
            cat_comment: req.body.cat_comment,
            cat_detail: req.body.cat_detail,
            cat_adopted: req.body.cat_adopted
        };
   
    console.log(catData);
    Cat.findOneAndUpdate( { _id: req.params.id }, catData, function updateCatData(err) {
        if(err) {
            res.sendStatus(500);
            console.log('Error here');
            return next(err);
        }

        res.sendStatus(200);
    })
};

