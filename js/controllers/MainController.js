/* global app */
app.controller('MainController', ['$scope', function($scope){ 
    $scope.currentBalance = null;
    $scope.yearlyAccrual = null;
    $scope.specialCase = false;
    $scope.carryOver = null;
    $scope.weeklyAccrual = null;
    $scope.accruedSoFar = null;
    $scope.willHave = null;
    $scope.mustUse = null;


    
    $scope.updateCarryOver = function(){
        if($scope.specialCase == true && $scope.yearlyAccrual !== null) {
            $scope.carryOver =  80 + parseInt($scope.yearlyAccrual, 10);
        }
        else {
            if($scope.yearlyAccrual === null){
                $scope.carryOver = null;
            }
            else $scope.carryOver = parseInt($scope.yearlyAccrual, 10);
        }
        $scope.updateBalanceDependents();
    };

    $scope.updateAccrualDependents = function(){

        var yearlyAcc = parseInt($scope.yearlyAccrual, 10);
        $scope.weeklyAccrual = yearlyAcc / 52;
        $scope.accruedSoFar = $scope.weeklyAccrual * parseInt(getWeekNumber(new Date)[1], 10);

        $scope.updateCarryOver();
    };

    $scope.updateBalanceDependents = function(){
        if($scope.currentBalance === null || $scope.yearlyAccrual === null)
        {
            $scope.willHave = null;
            $scope.mustUse = null;
        }
        else {
            var balance = parseInt($scope.currentBalance, 10);
            var yearlyAcc = parseInt($scope.yearlyAccrual, 10);

            if(balance < (yearlyAcc + 80))
            {
                if($scope.specialCase)
                {
                    $scope.specialCase = false;
                    $scope.updateCarryOver();
                }
            }


            $scope.willHave = balance + (yearlyAcc - $scope.accruedSoFar);
            if($scope.willHave > $scope.carryOver)
            {
                $scope.mustUse = $scope.willHave - $scope.carryOver;
            }
            else $scope.mustUse = 0;
        }
    };




    function getWeekNumber(d) {
       d = new Date(+d);
       d.setHours(0,0,0);
       d.setDate(d.getDate() + 4 - (d.getDay()||7));
       var yearStart = new Date(d.getFullYear(),0,1);
       var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
       return [d.getFullYear(), weekNo];
    }

}]);
