/**
 * Module Dependencies
 */
var mongoose = require('mongoose'),
  config = require('../../config/config'),
  Schema = mongoose.Schema;

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
    created: {
      type: Date,
      default: Date.now
    },
    title: {
      type: String,
      default: ''
    },
    summary: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: 'Active'
    },
    owner: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    members: [{
      type: Schema.ObjectId,
      ref: 'User'
    }]
});

/**
 * Statics
 */
ProjectSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('owner')
      .populate('members')
      .exec(cb);
  }
};

mongoose.model('Project', ProjectSchema);