var app = angular.module('givingSF', []);

app.controller('OrgController', function ($scope, $sce) {
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
      image: $scope.org.image,
      metric: { data:   $scope.org.metric.data,
                result: $scope.org.metric.result,
                time:   $scope.org.metric.time
              }
    });
    console.log( $scope.orgs );
    $scope.outputVisual($scope.org.image);
  };

  $scope.selectImage = function (event, index) {
    $scope.org.image = $scope.images[index];
    event.target.classList.toggle('selected');
    console.log($scope);
  };

  $scope.outputVisual = function (image) {
    $scope.htmlEls = [];
    for (var i = 0; i < $scope.org.metric.data; i++) {
      $scope.htmlEls.push($sce.trustAsHtml("<img src=\""+image+"\" class='icon'>"));
      console.log(i);
    }
    console.log($scope.htmlEls);
  };


});

