var app = angular.module('givingSF', []);

app.controller('OrgController', function ($scope) {
  $scope.orgs = [];
  $scope.org = {};
  $scope.images = [ "assets/images/mortarBoard.png",
                    "assets/images/meal.png",
                    "assets/images/briefcase.png",
                    "assets/images/art.png",
                    "assets/images/water.png" ];

  $scope.saveOrg = function () {
    $scope.orgs.push({
      name: $scope.org.name,
      metric: $scope.org.metric
    });
    console.log( $scope.orgs );
  };

  $scope.selectImage = function (event, index) {
    $scope.org.image = $scope.images[index];
    event.target.classList.toggle('selected');
    console.log($scope);
  };

  // $scope.isActive = function (image){
  //   return $scope.selected === image;
  // };

});

