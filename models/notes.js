const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var schemaNotes = new Schema({

    body: String,
    title: String

});

var note = mongoose.model("note", schemaNotes);

module.exports = note;