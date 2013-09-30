window.app = angular.module('mean', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.route', 'mean.system',
  'mean.projects', 'mean.users']);

angular.module('mean.system', []);
angular.module('mean.projects', []);
angular.module('mean.users', []);