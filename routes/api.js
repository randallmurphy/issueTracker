'use strict';

const IssueModel = require('../models').Issue;
const ProjectModel = require('../models').Project;



module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(async (req, res) =>{
      let projectName = req.params.project;
      try{
        const project = await ProjectModel.findOne({ name: projectName });
        if(!project) {
           res.json({ error: 'Project not found' });
           return;
        } else {
          const issues = await IssueModel.find({ 
            projectId: project._id,
          ...req.query,
         });
          if(!issues){
            res.json([{ error: 'No issues found' }]);
            return;
          }
          res.json(issues);
          return;
        }
      } catch(err){
        res.json({ error: 'could not get', _id: _id });
      }
      
    })
    
    .post(async (req, res) =>{
      let project = req.params.project;
      const { issueTitle, issueText, createdBy, assignedTo, statusText } = req.body;
      if(!issueTitle || !issueText || !createdBy) {
        return res.json({ error: 'Required fields missing' });
        return;
      }
      try{
        let projectModel = await ProjectModel.findOne({ name: project });
        if(!projectModel) {
          projectModel = new ProjectModel({ name: projectName });
          projectModel = await projectModel.save();
          
        }
        const issueModel = new IssueModel({
          projectId: projectModel._id,
          issueTitle: issueTitle || "",
          issueText: issueText || "",
          createdOn: new Date(),
          updatedOn: new Date(),
          createdBy: createdBy || "",
          assignedTo: assignedTo || "",
          open: true,
          statusText: statusText || "",
        });
        const issue = await issueModel.save();
        res.json(issue);
      } catch(err){
        res.json({ error: 'could not post', _id: _id });
      }
    })
    
    .put(async (req, res) =>{
      let projectName = req.params.project;
      const { _id, issueTitle, issueText, createdBy, assignedTo, statusText } = req.body;
      if(!_id){
        res.json({ error: 'missing _id' });
        return;
      }
      if(!issueTitle && !issueText && !createdBy && !assignedTo && !statusText && !open)  {
        res.json({ error: 'no update field(s) sent', _id: _id });
        return;
      }
      try{
        const projectModel = await ProjectModel.findOne({ name: projectName });
        if(!projectModel) {
          throw new Error('Project not found');
        }
        let issue = await IssueModel.findByIdAndUpdate(_id,{
          ...req.body,
          updatedOn: new Date(),
        });
        await issue.save();
        res.json({ result: 'successfully updated', _id: _id });
      } catch(err){
        res.json({ error: 'could not update', _id: _id });
      }
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
