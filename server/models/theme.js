const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThemeSchema = new Schema({
    name: String,
    order: Number,
});

const Theme = mongoose.model('Theme', ThemeSchema);

module.exports = Theme;