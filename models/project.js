const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const projectSchema = new Schema({
    projectName: String,
    createdBy: String,

    bom: [{
        mfgPnBom: [String],
        partQtyBom: [Number],
        internalPnBom: [String],
    }],
}, {timestamps: true});    

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;