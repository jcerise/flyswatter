/**
 * Module Dependencies
 */
var mongoose = require('mongoose'),
  async = require('async'),
  Project = mongoose.model('Project'),
  _ = require('underscore');

/**
 * Find Project by ID
 */
exports.project = function(req, res, next, id) {
  Project.load(id, function(err, project) {
    if (err)return next(err);
    if (!project) return next(new Error('Failed to load project ' + id));
    req.project = project;
    next();
  });
};

/**
 * Create a project
 */
exports.create = function(req, res) {
  var project = new Project(req.body);
  project.owner = req.user;

  project.save(function(err) {
    if (err) {
      return res.send('/users/signup', {
        errors: err.errors,
        project: project
      });
    } else {
      res.jsonp(project);
    }
  });
};

/**
 * Update a project
 */
exports.update = function(req, res) {
  var project = req.project;
  project = _.extend(project, req.body);
  project.save(function(err) {
    res.jsonp(project);
  });
};

/**
 * Destroy a project
 */
exports.destroy = function(req, res) {
  var project = req.project;

  project.remove(function(err) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(project);
    }
  });
};

/**
 * Show a project
 */
exports.show = function(req, res) {
  res.jsonp(req.project);
};

/**
 * List all projects
 */
exports.all = function(req, res) {
  Project.find().sort('-created').populate('user').exec(function(err, projects) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(projects);
    }
  });
};