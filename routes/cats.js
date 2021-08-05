var express = require('express');
var router = express.Router();
var cors = require('cors');

// Require Controller module.
var cat_controller = require('../controllers/catController');

const cors_option = { origin: 'https://floating-earth-83638.herokuapp.com/', }

/// CAT ROUTES ///

// GET home page ( View list of all cats )
router.get('/cat', cors(cors_option), cat_controller.cat_list);

// GET request for one Book.
router.get('/cat/:id', cors(cors_option), cat_controller.cat_detail);

// POST request for adding Cat.
router.post('/cat/add', cors(cors_option),  cat_controller.cat_add);

// DELETE request for deleting Cat.
router.delete('/cat/:id',cors(cors_option), cat_controller.cat_delete);

// PUT request to update Book.
router.put('/cat/:id', cors(cors_option), cat_controller.cat_update);


module.exports = router;