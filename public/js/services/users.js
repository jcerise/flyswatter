//Projects service used for projects REST endpoint
angular.module('mean.users').factory("Users", ['$resource', function($resource) {
  return $resource('users', {
  }, {
    query: {
      method: 'GET',
      isArray: true
    }
  });
}]);