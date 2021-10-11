const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const projectSchema = new Schema({
    projectName: String,
    createdBy: String,

    bom: [{
        mfgPnBom: String,
        partQtyBom: Number,
        internalPnBom: String,
    }],

    mfgPn: [String],      // will be removed
    partQty: [Number],   // will be removed
    internalPn: [String],    // will be removed
}, {timestamps: true});    

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;