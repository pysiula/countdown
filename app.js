angular.module('countdown', ['ui.bootstrap']);

function mainCtrl($scope, $interval) {

  function refresh() {

    var now = moment();

    var dateInFuture0 = moment('2018-08-26', 'YYYY-MM-DD', true);
    var timespan0 = moment.duration(dateInFuture0.diff(now));
    $scope.events[0].time = formatDuration(timespan0);

    var dateInFuture1 = moment('2018-03-20', 'YYYY-MM-DD', true);
    var timespan1 = moment.duration(dateInFuture1.diff(now));
    $scope.events[1].time = formatDuration(timespan1);
  }

  function formatDuration(duration) {
    return [duration.get('years'), 'years',
      duration.get('months'), 'months',
      duration.get('days'), 'days',
      duration.get('hours'), 'hours',
      duration.get('minutes'), 'minutes',
      duration.get('seconds'), 'seconds'].join(' ');
  }

  $scope.showNewEventDialog = false;
  $scope.showNewEventButtonLabel = 'Create new event';

  $scope.events = [
    { name: 'Holiday in Croatia', time: '' },
    { name: 'Pysizdas birthday', time: '' },
  ];

  $scope.addEvent = function () {
    if ($scope.name && $scope.time) {
      $scope.events.push({ name: $scope.name, time: $scope.time });
      $scope.name = '';
      $scope.time = '';
      $scope.showNewEventDialog = false;
    } else {
      alert('Can not create an empty event');
    }
  };

  $scope.toggleNewEventDialog = function () {
    $scope.showNewEventDialog = !$scope.showNewEventDialog;
    if ($scope.showNewEventDialog) {
      $scope.showNewEventButtonLabel = 'Close new event';
    } else {
      $scope.showNewEventButtonLabel = 'Create new event';
    }
  };

  $scope.isCalendarOpen = false;
  $scope.openCalendar = function () {
    $scope.isCalendarOpen = true;
  };
  $scope.calendarOptions = {
    startingDay: 1
  };

  $interval(refresh, 1000);
  refresh();
}

angular.module('countdown').controller('main', ['$scope', '$interval', mainCtrl]);


