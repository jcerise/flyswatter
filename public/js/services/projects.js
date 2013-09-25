//Projects service used for projects REST endpoint
angular.module('mean.articles').factory("Projects", ['$resource', function($resource) {
  var resource = $resource('projects/:projectId', {
    projectId: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
    get: {
      method: 'GET',
      isArray: true
    }
  });
  return resource;
}]);