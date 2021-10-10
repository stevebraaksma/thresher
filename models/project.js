const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectName: String,
    createdBy: String,
    mfgPn: [String],
    partQty: [Number],
    internalPn: [String],
}, {timestamps: true});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;