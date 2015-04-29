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
    $scope.orgDisplay = "";
    $scope.orgDisplay = $sce.trustAsHtml("<h1>" + $scope.org.name + "</h1>" + "<h2>" + $scope.org.metric.data + " " + $scope.org.metric.result + " over " + $scope.org.metric.time + " days</h2>");
    $scope.outputVisual($scope.org.image);
    $scope.org = "";
    console.log( $scope.orgs );
    $scope.postOrg($scope.org);
  };

  $scope.postOrg = function (org) {
    return $http({
      method: 'POST',
      url: '/api/org',
      data: org
    });
  };

  $scope.selectImage = function (event, index) {
    $scope.org.image = $scope.images[index];
    event.target.classList.toggle('selectedIcon');
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

//D3 Section, still a work in progress

// angular.module('d3', [])
//   .factory('d3', ['$document', '$q', '$rootScope', function($document, $q, $rootScope){
//     var d = $q.defer();
//     function onScriptLoad() {
//       $rootScope.$apply(function() { d.resolve(window.d3); });
//     }

//     var scriptTag = $document[0].createElement('script');
//     scriptTag.type = 'text/javascript';
//     scriptTag.async = true;
//     scriptTag.src = 'http://d3js.org/d3.v3.min.js';
//     scriptTag.onreadystatechange = function () {
//       if (this.readyState === 'complete') onScriptLoad();
//     };
//     scriptTag.onload = onScriptLoad;
//     var s = $document[0].getElementsByTagName('body')[0];
//     s.appendChild(scriptTag);

//     return {
//       d3: function () { return d.promise; }
//     };
//   }]);

  // angular.module('givingSF.directives')
  // .directive('d3-graph', ['d3', function(d3) {
  //   return {
  //     restrict: 'EA',
  //     scope: {},
  //     link: function (scope, element, attrs) {
  //       //d3 code to be entered here
  //       var svg = d3.select(element[0])
  //                   .append('svg')
  //                   .style('width', '100%');

  //       window.onresize = function () {
  //         scope.$apply();
  //       };

  //       // watch for resize event
  //       $scope.$watch(function() {
  //         return angular.element($window)[0].innerWidth;
  //       }, function () {
  //         $scope.render(scope.data);
  //       });

  //       $scope.$watch('data', function(newVals, oldVals) {
  //         return scope.render(newVals);
  //       }, true);

  //       $scope.render = function(data) {
  //         //custom d3 code
  //         svg.selectAll('*').remove();

  //         // setup variables
  //         var width =  d3.select(element[0])[0][0].offsetWidth - 20;
  //         var height = scope.data.length * 35;
  //         var color = d3.scale.category20();

  //         svg.attr('height', height);

  //         // create rectangles for bar chart

  //         svg.selectAll('rect')
  //           .data(data).enter()
  //           .append('rect')
  //           .attr('height', barHeight)
  //           .attr('width', 0)
  //           .attr('x', Math.round(margin/2))
  //           .attr('y', function(d, i) {
  //             return i * 35;
  //           })
  //           .attr('fill', function(d) {
  //             return color(d.score);
  //           })
  //           .transition().duration(1000)
  //           .attr('width', function(d) {
  //             return xScale(d.score);
  //           });
  //       };
  //     }};
  //   }]);