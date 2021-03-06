

(function () {
"use strict";
angular.module("MyApp").controller("AppCtrl", AppCtrl);

function AppCtrl($scope, $log) {



  var tabs = [
      {
        title: "One"

      }/* ,
      {
        title: "Two",
        content:
          "You can swipe left and right on a mobile device to change tabs."
      },
      {
        title: "Three",
        content:
          "You can bind the selected tab via the selected attribute on the md-tabs element."
      },
      {
        title: "Four",
        content:
          "If you set the selected tab binding to -1, it will leave no tab selected."
      },
      {
        title: "Five",
        content: "If you remove a tab, it will try to select a new one."
      },
      {
        title: "Six",
        content:
          "There's an ink bar that follows the selected tab, you can turn it off if you want."
      },
      {
        title: "Seven",
        content:
          "If you set ng-disabled on a tab, it becomes unselectable. If the currently selected tab becomes disabled, it will try to select the next tab."
      },
      {
        title: "Eight",
        content:
          "If you look at the source, you're using tabs to look at a demo for tabs. Recursion!"
      },
      {
        title: "Nine",
        content:
          'If you set md-theme="green" on the md-tabs element, you\'ll get green tabs.'
      },
      {
        title: "Ten",
        content:
          "If you're still reading this, you should just go check out the API docs for tabs!"
      */
    ],
    selected = null,
    previous = null;
  $scope.tabs = tabs;
  $scope.selectedIndex = 0;
  $scope.$watch("selectedIndex", function (current, old) {
    previous = selected;
    selected = tabs[current];

  });
  $scope.addTab = function (title) {
    title + " Content View";
    tabs.push({ title: title,disabled: false });
  };
  $scope.removeTab = function (tab) {
    var index = tabs.indexOf(tab);
    tabs.splice(index, 1);
  };

}


})();
