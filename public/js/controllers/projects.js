angular.module('mean.projects').controller('ProjectsController', ['$scope', '$routeParams', '$location', 'Global',
  'Projects', 'Users', function($scope, $routeParams, $location, Global, Projects, Users) {
    $scope.global = Global;

    //get a list of all users, so users can be associated with this project on creation
    $scope.findUsers = function(query) {
      $scope.users = new Array();
      Users.query(query, function(users) {
        angular.forEach(users, function (user) {
          if (user._id != Global.user._id) {
            $scope.users.push(user);
          }
        });
      });
    };

    $scope.create = function() {
      var project = new Projects({
        title: this.title,
        summary: this.summary,
        description: this.description,
        status: this.status,
        members: this.members
      });

      project.$save(function(response) {s
        $location.path('projects/' + response._id);
      });
      this.title = '';
      this.description = '';
      this.summary = '';
      this.members = '';
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
        $scope.projects = new Array();
        angular.forEach(projects, function (project) {
          //Fully load each project, so we get the user objects associated with the project, rather than just the IDss
          Projects.get({
            projectId: project._id
          }, function(project) {
            console.log(project);
            if (project.owner._id == Global.user._id) {
              $scope.projects.push(project);
            }
          });
        });
      });
    };

    $scope.find = function(query) {
      Projects.query(query, function(projects) {
        $scope.projects = new Array();
        angular.forEach(projects, function (project) {
          //Fully load each project, so we get the user objects associated with the project, rather than just the IDss
          Projects.get({
            projectId: project._id
          }, function(project) {
            if (project.owner._id == Global.user._id) {
              $scope.projects.push(project);
            }
          });
        });
      });
    };

    //Create a method specifically for puling data when editing. We do not want to fully load the whole object,
    //as this screws with the member select functionality.
    //TODO: Feels hacky, probably a better way to accomplish this
    $scope.findForEdit = function(query) {
      Projects.query(query, function(projects) {
        angular.forEach(projects, function (project) {
          if (project._id == $routeParams.projectId) {
            $scope.project = project;
          }
        });
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