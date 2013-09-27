//Projects service used for projects REST endpoint
angular.module('mean.articles').factory("Projects", ['$resource', function($resource) {
  return $resource('projects/:projectId', {
    projectId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);