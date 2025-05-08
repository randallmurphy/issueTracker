const mongoose = require('mongoose');
const { Schema } = mongoose;

const IssueSchema = new Schema({
    projectId: { type: String, required: true },
    issueTitle: { type: String, required: true },   
    issueText: { type: String, required: true },
    createdOn: Date,
    updatedOn: Date,
    createdBy: { type: String, required: true },
    assignedTo: String,
    open: Boolean,
    statusText: String,
});

const Issue = mongoose.model('Issue', IssueSchema);

const ProjectSchema = new Schema({
    name: { type: String, required: true },
});
const Project = mongoose.model('Project', ProjectSchema);

exports.Issue = Issue;
exports.Project = Project;
