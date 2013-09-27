angular.module('mean.projects').controller('ProjectsController', ['$scope', '$routeParams', '$location', 'Global',
  'Projects', function($scope, $routeParams, $location, Global, Projects) {
    $scope.global = Global;

    $scope.create = function() {
      var project = new Projects({
        title: this.title,
        summary: this.summary,
        description: this.description,
        status: this.status
      });

      project.$save(function(response) {
        $location.path('projects/' + response._id);
      });
      this.title = '';
      this.description = '';
      this.status = '';
    };

    $scope.remove = function(project) {
      project.$remove();
      for (var i in $scope.projects) {
        if ($scope.projects[i] == project) {
          $scope.projects.splice(i, 1);
        }
      }
    };

    $scope.update = function() {
      var project = $scope.project;
      if (!project.updated) {
        project.updated = [];
      }
      project.updated.push(new Date().getTime());

      project.$update(function() {
        $location.path('projects/' + project._id);
      });
    };

    $scope.find = function(query) {
      Projects.query(query, function(projects) {
        $scope.projects = projects;
        console.log(projects);
      });
    };

    $scope.findOne = function() {
      Projects.get({
        projectId: $routeParams.projectId
      }, function(project) {
        $scope.project = project;
      });
    };
  }]);