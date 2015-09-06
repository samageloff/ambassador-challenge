"use strict";angular.module("ambassadorApp",["ngCookies","ngResource","ngSanitize","ui.router","xeditable"]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){a.state("main",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl"}).state("referral",{url:"/:id",templateUrl:"app/referral/referral.html",controller:"ReferralCtrl"}).state("landing",{url:"/landing/*path",templateUrl:"app/landing/landing.html",controller:"LandingCtrl",reloadOnSearch:!1}),b.otherwise("/"),c.html5Mode(!0)}]).run(["editableOptions",function(a){a.theme="bs3"}]),angular.module("ambassadorApp").factory("ClickFactory",["$http",function(a){return{increment:function(b){var c={clicks:b.clicks+1};a.put("/api/referrals/"+b._id,c)}}}]),angular.module("ambassadorApp").filter("hyphenate",function(){return function(a){return a?angular.lowercase(a.replace(/ /g,"-").replace(/'/g,"")):""}}),angular.module("ambassadorApp").filter("textify",function(){return function(a){return a?angular.uppercase(a.replace(/-/g," ").replace(/'/g,"")):""}}),angular.module("ambassadorApp").controller("LandingCtrl",["$scope","$http","$location","ClickFactory",function(a,b,c,d){var e=c.search().link;a.title=e,a.error=!1,b.get("/api/referrals/"+e).then(function(a){var b=a.data;d.increment(b)},function(b){a.error=!0})}]),angular.module("ambassadorApp").controller("MainCtrl",["$scope","$http","$filter",function(a,b,c){a.referrals=[],a.predicate="link",a.reverse=!0,b.get("/api/referrals").then(function(b){a.referrals=b.data}),a.sortOrder=function(b){a.reverse=a.predicate===b?!a.reverse:!1,a.predicate=b},a.addReferral=function(d){if(d){var e=c("hyphenate")(d.link);a.referral={link:e,clicks:0},b.post("/api/referrals",a.referral).then(function(b){a.referrals.push(b.data)}),a.referral={}}},a.editReferral=function(d,e){var f=c("hyphenate")(e);a.referral={link:f},b.put("/api/referrals/"+d._id,a.referral)},a.deleteReferral=function(c){var d=a.referrals;b["delete"]("/api/referrals/"+c._id).then(function(a){d.splice(d.indexOf(c),1)})}}]),angular.module("ambassadorApp").controller("ReferralCtrl",["$scope","$stateParams","$location",function(a,b,c){c.path("/landing/").search({link:b.id}).replace()}]),angular.module("ambassadorApp").directive("referralForm",function(){return{templateUrl:"components/referral-form/referral-form.html",restrict:"AEC",link:function(a,b){b.addClass("referral-form")}}}),angular.module("demoApp").run(["$templateCache",function(a){a.put("app/landing/landing.html",'<div class=container><div class=landing><div ng-show=!error><h1>Check it out on the Internets: <a href="https://wikipedia.org/wiki/Special:Search/{{title | textify}}" tafget=_blank>{{title | textify}}</a>!</h1><img src=http://cdni.wired.co.uk/1240x826/a_c/03_13.jpg alt="Tim Berners-Lee"></div><div ng-show=error class=error><h1>Oh noes!</h1><p>This referral doesn\'t exist.</p><img src=http://nyulocal.com/wp-content/uploads/2014/03/sad-cat.jpg alt="sad cat"></div></div></div>'),a.put("app/main/main.html",'<header class=hero-unit id=banner><div class=container><h1>Grow the web with referrals!</h1><div referral-form></div></div></header><div class=container><div class=row><div class=col-lg-12><table class="table table-hover referral-links"><thead><tr><th><a href=# ng-click="sortOrder(\'link\')">Link title</a></th><th><a href=# ng-click="sortOrder(\'clicks\')">Clicks</a></th><th><!-- intentionally left empty --></th></tr></thead><tbody><tr ng-repeat="referral in referrals | orderBy:predicate:reverse"><td class=col-md-8><a href=# editable-text=referral.link onbeforesave="editReferral(referral, $data)" title="Edit referral">{{ referral.link | hyphenate : "empty" }}</a> <a href="/{{referral.link | hyphenate}}" class="fa fa-external-link" target=_blank title="View referral"><span class=visually-hidden>View link</span></a></td><td class=col-md-2>{{referral.clicks}}</td><td class=col-md-2><a href=# ng-click=deleteReferral(referral) title="Delete referral"><i class="fa fa-trash-o"><span class=visually-hidden>Trash it</span></i></a></td></tr></tbody></table></div></div></div>'),a.put("app/referral/referral.html","<header class=hero-unit id=banner><div class=container><h1>You're here at {{title}}!</h1></div></header>"),a.put("components/referral-form/referral-form.html",'<form class="referral-form form-inline" ng-submit=addReferral(referral) novalidate><div class=form-group><input class="form-control input-lg" ng-model=referral.link id=link placeholder="Add a link" required></div><button type=submit class="btn btn-default btn-lg">Add</button></form>')}]);