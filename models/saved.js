const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var schemaSaved = new Schema({

    link: {
        type: String,
        required: true
    },

    headline: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "note"
    }
});

var savedArticle = mongoose.model("article",schemaSaved)
module.exports = savedArticle;