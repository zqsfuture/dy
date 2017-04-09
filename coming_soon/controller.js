(function(angular) {
	'use strict';

	// 创建正在热映模块
	var module = angular.module('moviecat.coming_soon', [
		'ngRoute',
		'moviecat.services.http'
		])
		// 配置模块的路由
	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/coming_soon/:page', {
			templateUrl: 'coming_soon/view.html',
			controller: 'comingSoonController'
		});
	}])

	module.controller('comingSoonController', [
		'$scope',
		'$route',
		'$routeParams',
		'HttpService',
		function($scope,$route,$routeParams,HttpService) {
			var page=parseInt($routeParams.page);
			var count=5;
			var start=(page-1)*count;
			$scope.loading=true;
			$scope.subjects=[];
			$scope.message="";
			$scope.title="";
			$scope.totalCount=0;
			$scope.totalPages=0;
			HttpService.jsonp("http://api.douban.com/v2/movie/coming_soon",
				{start:start,count:count},
				function(data){
				$scope.title=data.title;
				$scope.subjects=data.subjects;
				$scope.page=parseInt($routeParams.page);
				$scope.totalCount=data.total;
				$scope.totalPages=Math.ceil($scope.totalCount/count);
				$scope.loading=false;
				$scope.$apply();
			});
			$scope.go=function(page) {
				if(page>=1&&page<=$scope.totalPages){
					$route.updateParams({page:page});
				}

			};
		}
	]);
})(angular)



// var doubanApiAddress = 'http://api.douban.com/v2/movie/coming_soon';
// // 测试$http服务
// // 在Angular中使用JSONP的方式做跨域请求，
// // 就必须给当前地址加上一个参数 callback=JSON_CALLBACK
// $http.jsonp(doubanApiAddress+'?callback=JSON_CALLBACK').then(function(res) {
//   // 此处代码是在异步请求完成过后才执行（需要等一段时间）
//   if (res.status == 200) {
//     $scope.subjects = res.data.subjects;
//   } else {
//     $scope.message = '获取数据错误，错误信息：' + res.statusText;
//   }
// }, function(err) {
//   console.log(err);
//   $scope.message = '获取数据错误，错误信息：' + err.statusText;
// });
