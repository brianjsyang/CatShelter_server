const { Decimal128, Int32 } = require('mongodb');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CatSchema = new Schema(
    {
        cat_name: { type: String, required: [true, 'Ex: Luna'], maxLength: 50 },
        cat_pic: { type: String },
        cat_breed: { type: String, required: [true, 'Ex: Bengal'] },
        cat_age: { type: Number, min: 0, required: [true, 'Essential Information'] },
        cat_comment: { type: String, max: [150, 'Too long!'] },
        cat_detail: { type: String },
        cat_adopted: { type: Boolean, default: false }
    }
);


// Virtual for Cat Url
CatSchema
.virtual('url')
.get(function () {
     return '/cats/' + this._id;
});


// Export model
module.exports = mongoose.model('Cat', CatSchema, 'cats_shelter');