/* global app */
app.controller('MainController', ['$scope', function($scope){ 
    $scope.currentBalance = null;
    $scope.yearlyAccrual = null;
    $scope.specialCase = false;
    
    $scope.totalAccrual = null;
    
    $scope.updateTotalAccrual = function(){
        if($scope.specialCase == true) {
                $scope.totalAccrual =  80 + parseInt($scope.yearlyAccrual, 10);
            }
        else {
                $scope.totalAccrual = parseInt($scope.yearlyAccrual, 10);
            }
    };
}]);